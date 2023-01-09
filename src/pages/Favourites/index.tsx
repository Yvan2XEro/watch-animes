import {
  IonAvatar,
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
  useIonRouter,
} from "@ionic/react";
import AppHeaderWrapper from "../../components/AppHeaderWrapper";
import { Virtuoso } from "react-virtuoso";
import { useFavourites } from "../../contexts";
import { socialsShare, substring } from "../../functions";
import "./Favourites.css";
import { eyeOutline, shareSocial, trashSharp } from "ionicons/icons";

export default function Favourites() {
  const { animes, removeFromFavourites } = useFavourites();
  const router = useIonRouter();
  const [actionSheet] = useIonActionSheet();
  return (
    <IonPage>
      <AppHeaderWrapper>
        <IonToolbar color="secondary">
          <IonTitle>Favourites</IonTitle>
        </IonToolbar>
      </AppHeaderWrapper>
      <IonContent>
        <Virtuoso
          data={animes}
          itemContent={(i, anime) => (
            <IonItem
              color="secondary"
              onDragEnd={() => console.log("Favourite")}
              //   onClick={() => }
              onClick={() =>
                actionSheet(
                  [
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
                  ],
                  anime.animeTitle
                )
              }
            >
              <IonAvatar slot="start">
                <img src={anime.animeImg} alt={anime.animeTitle} />
              </IonAvatar>
              <IonLabel>{substring(anime.animeTitle, 50)}</IonLabel>
            </IonItem>
          )}
        />
      </IonContent>
    </IonPage>
  );
}
