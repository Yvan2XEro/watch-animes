import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInfiniteScroll,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useParams } from "react-router";
import "./ListAnimes.css";
import { Anime } from "../../types";
import Loader from "../../components/Loader";
import AnimeCard from "../../components/AnimeCard";
import React, { useState } from "react";

export default function ListAnimes() {
  const router = useIonRouter();
  const { genre } = useParams() as { genre: string };
  const { data, page, fetchNextPage, error, isLoading, nextPage } =
    useAnimesListActions();

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
            {data.pages.map((groups, i) => (
              <React.Fragment key={i}>
                {groups.map((a) => (
                  <IonCol key={a.animeId} size="4" size-md="3" size-lg="2">
                    <AnimeCard anime={a} />
                  </IonCol>
                ))}
              </React.Fragment>
            ))}
          </IonRow>
          <IonInfiniteScroll
            onIonInfinite={(ev) => {
              fetchNextPage({ pageParam: page });
              nextPage();
            }}
          >
            <Loader loading />
          </IonInfiniteScroll>
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
  const [page, setPage] = useState(1);

  const response = useInfiniteQuery<Anime[]>(
    ["genre-", genre],
    ({ pageParam = 1 }) =>
      fetch(
        `https://gogoanime.consumet.org/genre/${genre}?page=${pageParam}`
      ).then((res) => res.json()),
    {
      getNextPageParam: () => page,
    }
  );
  return { ...response, page, nextPage: () => setPage((q) => q + 1) };
}
