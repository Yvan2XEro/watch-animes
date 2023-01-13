import {
  IonAvatar,
  IonBackButton,
  IonButtons,
  IonCard,
  IonContent,
  IonIcon,
  IonItem,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./About.css";
import AppHeaderWrapper from "../../components/AppHeaderWrapper";
import Logo from "../../assets/logo.png";
import {
  business,
  informationCircleSharp,
  location,
  person,
  syncOutline,
} from "ionicons/icons";
import { AppVersion } from "@ionic-native/app-version";
import { useEffect, useState } from "react";

export default function About() {
  const [appInfo, setAppInfo] = useState({
    appName: "Watch Animes",
    appVersion: "0.1.0",
    appId: "",
  });
  useEffect(() => {
    (async () => {
      AppVersion.getAppName().then((appName) =>
        setAppInfo((p) => ({ ...p, appName }))
      );
      AppVersion.getVersionNumber().then((appVersion) =>
        setAppInfo((p) => ({ ...p, appVersion }))
      );
      AppVersion.getPackageName().then((appId) =>
        setAppInfo((p) => ({ ...p, appId }))
      );
    })();
  }, []);
  function AppBlock() {
    return (
      <IonCard color={"none"}>
        <IonRow className="ion-padding-horizontal app_title_logo_wrapper">
          <IonAvatar>
            <img src={Logo} alt="App logo" />
          </IonAvatar>
          <div>
            <h3 className="ion-no-padding ion-no-margin">{appInfo.appName}</h3>
            <p className="ion-no-padding ion-no-margin">@{appInfo.appId}</p>
          </div>
        </IonRow>
        <DetailItem
          icon={informationCircleSharp}
          label="Version"
          subLabel={appInfo.appVersion}
        />
        <DetailItem icon={syncOutline} label="Update" subLabel="Up to date" />
      </IonCard>
    );
  }

  function AutorsBlock() {
    return (
      <IonCard color={"none"}>
        <h4 className="ion-padding-horizontal">Autors</h4>
        <DetailItem
          icon={person}
          label="Yvan Kana, Cedric Tefoye"
          subLabel="Cameroon, Dschang"
        />
      </IonCard>
    );
  }

  function Compagny() {
    return (
      <IonCard color={"none"}>
        <h4 className="ion-padding-horizontal">Compagny</h4>
        <DetailItem
          icon={business}
          label="WDS-Agency"
          subLabel="Web And Digital Services Agency"
        />
        <DetailItem icon={location} label="Cameroon, Dschang" subLabel="" />
      </IonCard>
    );
  }
  function DetailItem({ label, icon, subLabel }: DeatilsProps) {
    return (
      <IonItem className="details_item" lines="none" color="none">
        <IonIcon color="medium" icon={icon} />
        <div className="details_labels">
          <h4 className="ion-no-margin">{label}</h4>
          <p className="ion-no-margin">{subLabel}</p>
        </div>
      </IonItem>
    );
  }

  return (
    <IonPage>
      <AppHeaderWrapper>
        <IonToolbar color={"secondary"}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/settings" />
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </AppHeaderWrapper>
      <IonContent>
        <AppBlock />
        <AutorsBlock />
        <Compagny />
      </IonContent>
    </IonPage>
  );
}

type DeatilsProps = { label: string; icon: string; subLabel: string };
