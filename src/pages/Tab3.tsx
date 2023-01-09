import { IonContent, IonPage } from "@ionic/react";
import "./Tab3.css";
import Error from "../components/Error";

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Error type="not-found" />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
