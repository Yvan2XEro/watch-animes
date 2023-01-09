import { IonHeader } from "@ionic/react";

export default function AppHeaderWrapper({ children }: any) {
  return <IonHeader className="ion-no-border">{children}</IonHeader>;
}
