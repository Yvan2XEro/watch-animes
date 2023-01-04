import { IonHeader, IonToolbar } from "@ionic/react";
import React from "react";

export default function AppHeaderWrapper({ children }: any) {
  return <IonHeader className="ion-no-border">{children}</IonHeader>;
}
