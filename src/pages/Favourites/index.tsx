import {
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import AppHeaderWrapper from "../../components/AppHeaderWrapper";
import { Virtuoso } from "react-virtuoso";
import "./Favourites.css";
import { useFavourites } from "../../hooks";
import AnimeListItem from "../../components/AnimeListItem";
import { eyeOutline, shareSocial, trashSharp } from "ionicons/icons";
import { socialsShare } from "../../functions";
import Error from "../../components/Error";

export default function Favourites() {
  const { animes, removeFromFavourites } = useFavourites();
  const router = useIonRouter();
  return (
    <IonPage>
      <AppHeaderWrapper>
        <IonToolbar color="secondary">
          <IonTitle>Favourites</IonTitle>
        </IonToolbar>
      </AppHeaderWrapper>
      <IonContent>
        {animes.length <= 0 ? (
          <Error type="empty-set" />
        ) : (
          <Virtuoso
            data={animes}
            itemContent={(i, anime) => (
              <AnimeListItem
                anime={anime}
                actions={[
                  {
                    text: "Go to watching",
                    icon: eyeOutline,
                    handler() {
                      router.push("/home/details-" + anime.animeId);
                    },
                  },
                  {
                    text: "Share",
                    icon: shareSocial,
                    handler() {
                      socialsShare(anime);
                    },
                  },
                  {
                    text: "Delete",
                    icon: trashSharp,
                    handler() {
                      if (window.confirm("Are you sure to remove this item?"))
                        removeFromFavourites(anime);
                    },
                  },
                ]}
                key={i}
              />
            )}
          />
        )}
      </IonContent>
    </IonPage>
  );
}
