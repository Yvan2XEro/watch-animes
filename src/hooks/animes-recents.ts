import { Anime, AnimeRecent, Episode } from "../types";
import { useLocalStorage } from "usehooks-ts";

export function useAnimesRecents() {
    const [recentsAnimes, setRecentsAnimes] = useLocalStorage<AnimeRecent[]>("recents-animes", []);

    function getFromRecents(anime: Anime) {
        return recentsAnimes.find((recent) => recent.anime.animeId === anime.animeId);
    }
    function isInRecents(anime: Anime): boolean {
        return !!getFromRecents(anime)
    }

    function addToAnimesRecents(anime: Anime, lastEpisode: Episode) {
        let data: AnimeRecent = { anime, date: new Date(), lastEpisode }
        setRecentsAnimes((previousAnimes) => [...(previousAnimes.filter(r => r.anime.animeId !== anime.animeId)), data]);
    }

    function removeFromAnimesRecents(anime: Anime) {
        setRecentsAnimes((recents) => recents.filter((r) => r.anime.animeId !== anime.animeId));
    }

    function getEpisode(anime: Anime) {
        const recent = getFromRecents(anime);
        if (!recent) return
        return recent.lastEpisode
    }

    return {
        recentsAnimes: recentsAnimes.map(r => ({ ...r, date: new Date(r.date) })).reverse(),
        isInRecents,
        addToAnimesRecents,
        getEpisode,
        removeFromAnimesRecents,
    };
}
