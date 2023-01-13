import Lottie from "lottie-react";
import NoInternet from "./../../assets/no-internet.json";
import NotFound2 from "./../../assets/404-sleep-cat.json";
import Empty from "../../assets/not-found.json";

import "./index.css";
import { IonLabel, IonText } from "@ionic/react";

type ErrorProps = {
  type: "no-internet" | "not-found" | "empty-set";
  onClose?: () => void;
};
const lotties = {
  "no-internet": {
    title: "No Internet",
    file: NoInternet,
    text: "Make sure your device is connected to the internet and try again!",
    onClose: () => undefined,
  },
  "not-found": {
    title: "Not Found",
    file: NotFound2,
    text: "Unable to find this content.",
    onClose: () => undefined,
  },
  "empty-set": {
    title: "Empty set",
    file: Empty,
    text: "",
    onClose: () => undefined,
  },
};
export default function Error({ onClose, type }: ErrorProps) {
  const { title, file, text } = lotties[type];
  return (
    <div>
      <Lottie style={{ height: "50vh" }} animationData={file} />
      <div className="center">
        <div className="ion-padding-horizontal text_block">
          <h2>
            <IonLabel color="light">{title}</IonLabel>
          </h2>
          <IonText color="light">{text}</IonText>
          {/* <IonRow>
            <IonButton onClick={onClose}>Retry</IonButton>
          </IonRow> */}
        </div>
      </div>
    </div>
  );
}
