import {
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import AppHeaderWrapper from "../../components/AppHeaderWrapper";
import { useAnimesRecents, useFavourites } from "../../hooks";
import { Virtuoso } from "react-virtuoso";
import AnimeListItem from "../../components/AnimeListItem";
import {
  eyeOutline,
  shareSocial,
  star,
  starOutline,
  trashSharp,
} from "ionicons/icons";
import { dateFromNow, socialsShare } from "../../functions";
import Error from "../../components/Error";

export default function MyRecents() {
  const { recentsAnimes, removeFromAnimesRecents } = useAnimesRecents();
  const { toggleAsFavourite, isFavourite } = useFavourites();
  const [present, hide] = useIonToast();
  const router = useIonRouter();

  return (
    <IonPage>
      <AppHeaderWrapper>
        <IonToolbar color="secondary">
          <IonTitle>My recents animes</IonTitle>
        </IonToolbar>
      </AppHeaderWrapper>
      <IonContent>
        {recentsAnimes.length <= 0 ? (
          <Error type="empty-set" />
        ) : (
          <Virtuoso
            data={recentsAnimes}
            itemContent={(i, recent) => (
              <AnimeListItem
                actions={[
                  {
                    text: "Go to watching",
                    icon: eyeOutline,
                    handler() {
                      router.push("/home/details-" + recent.anime.animeId);
                    },
                  },
                  {
                    text: isFavourite(recent.anime)
                      ? "Remove from favourites"
                      : "Add to favourites",
                    icon: isFavourite(recent.anime) ? star : starOutline,
                    handler() {
                      toggleAsFavourite(recent.anime);
                      hide().then(() => {
                        const message = !isFavourite(recent.anime)
                          ? "Added successfully."
                          : "Removed from favorites list.";
                        present({ message, duration: 2000 });
                      });
                    },
                  },
                  {
                    text: "Share",
                    icon: shareSocial,
                    handler() {
                      socialsShare(recent.anime);
                    },
                  },
                  {
                    text: "Delete",
                    icon: trashSharp,
                    handler() {
                      if (window.confirm("Are you sure to remove this item?"))
                        removeFromAnimesRecents(recent.anime);
                    },
                  },
                ]}
                anime={recent.anime}
                key={i}
                bottom={
                  dateFromNow(recent.date) +
                  " | Ep-" +
                  recent.lastEpisode.episodeNum
                }
              />
            )}
          />
        )}
      </IonContent>
    </IonPage>
  );
}
