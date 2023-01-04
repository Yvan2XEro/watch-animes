import { IonContent, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import "./Home.css";
import AnimesSlider from "../../components/AnimesSlider";
import AppHeaderWrapper from "../../components/AppHeaderWrapper";
import { useAnimes } from "../../contexts";
import FiltersGenresButtons from "../../components/FiltersGenresButtons";
import AppSearch from "../../components/AppSearch";

const Home: React.FC = () => {
  const { loading, movies, populars, recents, topHairing } = useAnimes();
  return (
    <IonPage>
      <AppHeaderWrapper>
        <IonToolbar color="secondary">
          <IonTitle>Easy Animes</IonTitle>
        </IonToolbar>
        <IonToolbar color="secondary">
          <AppSearch />
        </IonToolbar>
      </AppHeaderWrapper>
      <IonContent fullscreen>
        <div className="ion-padding-horizontal">
          <FiltersGenresButtons />
        </div>
        {loading && "loading....."}
        <div>
          <AnimesSlider title="Movies" data={movies} filterKey="Mangas" />
          <AnimesSlider title="populars" data={populars} filterKey="Mangas" />
          <AnimesSlider title="recents" data={recents} filterKey="Animes" />
          <AnimesSlider
            title="topHairing"
            data={topHairing}
            filterKey="Animes"
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
