import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
  IonItemDivider,
} from "@ionic/react";
import AppHeaderWrapper from "../../components/AppHeaderWrapper";
import {
  alertCircleOutline,
  chevronForward,
  helpCircleOutline,
  notifications,
  notificationsOutline,
} from "ionicons/icons";
import "./index.css";
import {
  ScheduleOptions,
  LocalNotifications,
} from "@capacitor/local-notifications";
import { useEffect } from "react";
import { notifyLocally } from "../../functions";

export default function Settings() {
  useEffect(() => {
    notifyLocally("Un titre", "Une notification de test");
  }, []);
  return (
    <IonPage>
      <AppHeaderWrapper>
        <IonToolbar color="secondary">
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </AppHeaderWrapper>
      <IonContent>
        <div className="ion-padding">
          <IonItem color={"none"} lines="none" className="setting-item">
            <IonIcon slot="start" color="light" icon={notifications} />
            <IonLabel color="medium">
              <strong>Push notifications</strong>
            </IonLabel>
            <IonToggle slot="end" />
          </IonItem>
          <IonItem color={"none"} lines="none" className="setting-item">
            <IonIcon slot="start" color="light" icon={notificationsOutline} />
            <IonLabel color="medium">
              <strong>Local notifications</strong>
            </IonLabel>
            <IonToggle slot="end" />
          </IonItem>
          <IonItemDivider color={"none"} />
          <IonItem color={"none"} lines="none" className="setting-item">
            <IonIcon slot="start" color="light" icon={helpCircleOutline} />
            <IonLabel color="medium">
              <strong>Help</strong>
            </IonLabel>
            <IonIcon color="light" slot="end" icon={chevronForward} />
          </IonItem>
          <IonItem
            href="/settings/about"
            color="none"
            lines="none"
            className="setting-item"
          >
            <IonIcon slot="start" color="light" icon={alertCircleOutline} />
            <IonLabel color="medium">
              <strong>About</strong>
            </IonLabel>
            <IonIcon color="light" slot="end" icon={chevronForward} />
          </IonItem>
        </div>
      </IonContent>
    </IonPage>
  );
}
