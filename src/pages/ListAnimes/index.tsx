import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import "./ListAnimes.css";
import { Anime } from "../../types";
import Loader from "../../components/Loader";
import AnimeCard from "../../components/AnimeCard";

export default function ListAnimes() {
  const router = useIonRouter();
  const { genre } = useParams() as { genre: string };
  const { data, error, isLoading } = useAnimesListActions();

  const Header = () => {
    return (
      <IonHeader className="ion-no-border" translucent collapse="fade">
        <IonToolbar color="secondary">
          <IonButtons slot="start">
            {!error ? (
              <IonBackButton defaultHref="/"></IonBackButton>
            ) : (
              <IonButton onClick={() => router.push("/")} color="danger">
                Cancel
              </IonButton>
            )}
          </IonButtons>
          <IonTitle>
            {genre.charAt(0).toUpperCase() +
              genre.replaceAll("-", " ").substring(1, genre.length)}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
    );
  };

  const HandledContent = () => {
    if (isLoading) return <Loader loading={isLoading} />;
    if (!!data)
      return (
        <IonGrid>
          <IonRow>
            {data.map((a) => (
              <IonCol key={a.animeId} size="4" size-md="3" size-lg="2">
                <AnimeCard anime={a} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      );
    return <>Error</>;
  };

  return (
    <IonPage>
      <Header />
      <IonContent>
        <HandledContent />
      </IonContent>
    </IonPage>
  );
}

function useAnimesListActions() {
  const { genre } = useParams() as { genre: string };
  const response = useQuery<Anime[]>("genre-" + genre, () =>
    fetch(`https://gogoanime.consumet.org/genre/${genre}`).then((res) =>
      res.json()
    )
  );
  return response;
}
