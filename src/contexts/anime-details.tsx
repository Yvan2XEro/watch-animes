import { UseQueryResult, useQuery } from "react-query";
import { useParams } from "react-router";
import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import {
  StreamingMedia,
  StreamingVideoOptions,
} from "@awesome-cordova-plugins/streaming-media";
import { Anime, AnimeDetails, Episode, StreamingItem } from "../types";
import { API_URL } from "../data";
import { useIonToast } from "@ionic/react";
import { socialsShare } from "../functions";
import { useAnimesRecents, useFavourites } from "../hooks";

function useAnimeDetailsActions() {
  const { animeId } = useParams() as any;
  const { addToAnimesRecents, getEpisode } = useAnimesRecents();
  const detailsResponse = useQuery<AnimeDetails>(
    "anime-details-" + animeId,
    () => fetch(`${API_URL}/anime-details/${animeId}`).then((res) => res.json())
  );

  const [episodeIndex, setEpisodeIndex] = useState(0);

  const {
    isFavourite,
    addToFavourites,
    removeFromFavourites,
    toggleAsFavourite,
  } = useFavourites();

  const episodes = useMemo<Episode[]>(() => {
    if (!detailsResponse.data || !detailsResponse.data.episodesList) return [];
    return detailsResponse.data.episodesList;
  }, [detailsResponse.data]);

  const anime = useMemo<Anime>(() => {
    return {
      animeId,
      animeTitle: `${detailsResponse.data?.animeTitle}`,
      animeImg: `${detailsResponse.data?.animeImg}`,
    };
  }, [detailsResponse.data, animeId]);

  const [currentEpisode, setCurrentEpisode] = useState<Episode | undefined>(
    episodes[episodeIndex]
  );

  useEffect(() => {
    const episode = getEpisode(anime);
    if (!episode) return;
    const lastEpisodeIdex = episodes.findIndex(
      (e) => e.episodeId === episode.episodeId
    );
    setEpisodeIndex(lastEpisodeIdex);
  }, [anime, episodes, getEpisode]);

  useEffect(() => {
    setCurrentEpisode((v) => {
      if (v?.episodeId !== episodes[episodeIndex]?.episodeId) {
        return episodes[episodeIndex];
      }
      return v;
    });
  }, [episodeIndex, episodes]);

  const fetchCurrentEpisodeResolution = async () =>
    fetchStreamingUrl(currentEpisode?.episodeId);

  const {
    isFetching: fetchingResolutions,
    data,
    error: errorFetchingResolutions,
  } = useQuery([currentEpisode?.episodeId], fetchCurrentEpisodeResolution, {
    enabled: !!currentEpisode?.episodeId,
  });

  const resolutions = useMemo(() => data?.reverse(), [data]);

  const playCurrentEpisode = async () => {
    if (!!resolutions) return play(resolutions[0]?.file, streamingOptions);
  };

  function next() {
    setEpisodeIndex((i) => {
      if (i >= episodes.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setEpisodeIndex((i) => {
      if (i <= 0) return 0;
      return i - 1;
    });
  }

  function goTo(index: number) {
    setEpisodeIndex(index);
  }
  const [present, hide] = useIonToast();

  function errorPlaying() {
    hide().then(() =>
      present({
        message: "Something wrong. Please another resolution!",
        duration: 5000,
        position: "bottom",
        buttons: ["cancel"],
      })
    );
  }
  return {
    ...detailsResponse,
    episodes,
    isFirst: episodeIndex === 0,
    isLast: episodeIndex === episodes.length - 1,
    errorFetchingResolutions,
    episodeIndex,
    fetchingResolutions,
    resolutions,
    next,
    back,
    goTo,
    play: (file: string) => {
      play(file, {
        ...streamingOptions,
        errorCallback: errorPlaying,
      });
      if (!!currentEpisode) addToAnimesRecents(anime, currentEpisode);
    },
    currentEpisode,
    setCurrentEpisode,
    playCurrentEpisode,
    socialsShare: () => socialsShare(anime),
    isFavourite: isFavourite(anime),
    addToFavourites: () => addToFavourites(anime),
    toggleAsFavourite: () => toggleAsFavourite(anime),
    removeFromFavourites: () => removeFromFavourites(anime),
  };
}

function play(file: string, options?: StreamingVideoOptions) {
  return StreamingMedia.playVideo(file, options ? options : streamingOptions);
}

const streamingOptions: StreamingVideoOptions = {
  shouldAutoClose: true,
  controls: true,
};
const fetchStreamingUrl = async (episodeId?: string) => {
  if (!!episodeId)
    return fetch(`${API_URL}/vidcdn/watch/${episodeId}`)
      .then(
        (detailsResponse) =>
          detailsResponse.json() as Promise<{
            sources: StreamingItem[];
            sources_bk: StreamingItem[];
          }>
      )
      .then(({ sources, sources_bk }) => [...sources, ...sources_bk]);
};

const AnimeDetailsContext = React.createContext({});

export function AnimeDetailsProvider({ children }: PropsWithChildren) {
  const contextValue = useAnimeDetailsActions();
  return (
    <AnimeDetailsContext.Provider value={contextValue}>
      {children}
    </AnimeDetailsContext.Provider>
  );
}

type UseAnimeDetailsType = UseQueryResult<AnimeDetails, unknown> & {
  episodes: Episode[];
  isFirst: boolean;
  isLast: boolean;
  errorFetchingResolutions: any;
  episodeIndex: number;
  fetchingResolutions: boolean;
  resolutions: StreamingItem[] | undefined;
  next: () => void;
  back: () => void;
  goTo: (v: number) => void;
  play: (file: string, options?: StreamingVideoOptions) => void;
  currentEpisode: Episode | undefined;
  setCurrentEpisode: (episode: Episode) => void;
  playCurrentEpisode: () => Promise<void>;
  isFavourite: boolean;
  addToFavourites: () => void;
  socialsShare: () => void;
  toggleAsFavourite: () => void;
  removeFromFavourites: () => void;
};

export function useAnimeDetails() {
  const context = React.useContext(AnimeDetailsContext);
  if (context === undefined) {
    throw new Error("useAnimeDetails must be used within animeDetailsProvider");
  }
  return context as UseAnimeDetailsType;
}
