import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonIcon,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import AnimesSlider from "../../components/AnimesSlider";
import AppHeaderWrapper from "../../components/AppHeaderWrapper";
import FiltersGenresButtons from "../../components/FiltersGenresButtons";
import AppSearch from "../../components/AppSearch";
import Icon from "../../assets/wa.png";
import { notifications } from "ionicons/icons";
import { useNotification } from "../../contexts";

const Home: React.FC = () => {
  const { openNotificationsSheet } = useNotification();
  function HandleContent() {
    return (
      <>
        <div className="ion-padding-horizontal">
          <FiltersGenresButtons />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <AnimesSlider startUrl="recent-release" title="Recents Releases" />
          <AnimesSlider startUrl="popular" title="populars" />
          <AnimesSlider startUrl="anime-movies" title="Movies" />
          <AnimesSlider title="Top Airings" startUrl="top-airing" />
        </div>
      </>
    );
  }
  return (
    <IonPage>
      <AppHeaderWrapper>
        <IonToolbar color="secondary">
          <IonCol slot="start">
            <div className="ion-padding-horizontal">
              <img
                width={100}
                height={50}
                className="logo"
                src={Icon}
                alt="Logo"
              />
            </div>
          </IonCol>
          <IonButtons slot="end">
            <IonButton
              onClick={openNotificationsSheet}
              className="notifications_button"
              shape="round"
            >
              <IonIcon icon={notifications} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar color="secondary">
          <AppSearch />
        </IonToolbar>
      </AppHeaderWrapper>
      <IonContent fullscreen>
        <HandleContent />
      </IonContent>
    </IonPage>
  );
};

export default Home;
