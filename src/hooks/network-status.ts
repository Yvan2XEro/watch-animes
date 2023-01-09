import { useEffect } from "react";
import { Network, ConnectionStatus } from "@capacitor/network";
import { useIonToast } from "@ionic/react";

export function useNetworkStatus() {
  const [present] = useIonToast();
  useEffect(() => {
    function handleNetworkStatus(status: ConnectionStatus) {
      const message = status.connected ? "Back online" : "No internet access";
      const color = status.connected ? "primary" : "dark";
      present({
        message,
        position: "bottom",
        duration: 3000,
        color,
        buttons: ["cancel"],
      });
    }
    let listener = Network.addListener(
      "networkStatusChange",
      handleNetworkStatus
    );

    return () => {
      listener.remove();
    };
  }, [present]);
}
