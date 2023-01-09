import { useEffect } from "react";
import { useHistory } from "react-router";
import { App, URLOpenListenerEvent } from "@capacitor/app";

export default function AppExternalUrlListener() {
  const history = useHistory();

  useEffect(() => {
    App.addListener("appUrlOpen", (event: URLOpenListenerEvent) => {
      const slug = event.url.split(".app").pop();
      if (slug) {
        history.push(slug);
      }
    });
  }, [history]);
  return <></>;
}
