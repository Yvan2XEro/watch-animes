import {
  IonHeader,
  IonItem,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { PropsWithChildren, useState } from "react";

function useNotificationInitProps() {
  const [isOpen, setIsOpen] = useState(false);
  return {
    openNotificationsSheet: () => setIsOpen(true),
    closeNotificationsSheet: () => setIsOpen(false),
    isOpen,
  };
}

const NotificationsContext = React.createContext({
  openNotificationsSheet: () => {},
  closeNotificationsSheet: () => {},
  isOpen: false,
});

export function NotificationsProvider({ children }: PropsWithChildren) {
  const { isOpen, ...others } = useNotificationInitProps();
  return (
    <NotificationsContext.Provider value={{ ...others, isOpen }}>
      {children}
      <IonModal
        breakpoints={[0, 0.2, 0.5, 1]}
        initialBreakpoint={0.5}
        backdropBreakpoint={0.2}
        onDidDismiss={others.closeNotificationsSheet}
        isOpen={isOpen}
      >
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonTitle>Notifications</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>🔥✨ The animes in VF and VOSTFR are coming soon.</IonItem>
          <IonItem>👋 Welcome to your animes streaming app.</IonItem>
        </IonList>
      </IonModal>
    </NotificationsContext.Provider>
  );
}

export function useNotification() {
  return React.useContext(NotificationsContext);
}
