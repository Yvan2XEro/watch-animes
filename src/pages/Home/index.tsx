import { IonContent, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import "./Home.css";
import AnimesSlider from "../../components/AnimesSlider";
import AppHeaderWrapper from "../../components/AppHeaderWrapper";
import FiltersGenresButtons from "../../components/FiltersGenresButtons";
import AppSearch from "../../components/AppSearch";

const Home: React.FC = () => {
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
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <AnimesSlider startUrl="recent-release" title="Recents Releases" />
          <AnimesSlider startUrl="popular" title="populars" />
          <AnimesSlider startUrl="anime-movies" title="Movies" />
          <AnimesSlider title="Top Airings" startUrl="top-airing" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
