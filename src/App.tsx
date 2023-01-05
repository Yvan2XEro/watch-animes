import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  isPlatform,
  setupIonicReact,
  useIonRouter,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { fileTrayFullOutline, homeOutline, star } from "ionicons/icons";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";

/* Core CSS restatus bar overlaps top tabsquired for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Home from "./pages/Home";
import Details from "./pages/Details";
import { Provider as AnimesProvider } from "./contexts/animes-context";
import ListAnimes from "./pages/ListAnimes";
import { StatusBar } from "@awesome-cordova-plugins/status-bar";
import { AnimeDetailsProvider } from "./contexts";
import { App as CapApp } from "@capacitor/app";
import ListAnimesByType from "./pages/ListAnimesByType";

setupIonicReact();

if (isPlatform("mobile")) {
  StatusBar.overlaysWebView(false);
  StatusBar.backgroundColorByHexString("#343466");
}
document.addEventListener("ionBackButton", (ev: any) => {
  ev.detail.register(10, (processNextHandler: () => void) => {
    console.log("Handler was called!");

    processNextHandler();
  });
});
const App: React.FC = () => {
  const ionRouter = useIonRouter();
  document.addEventListener("ionBackButton", (ev: any) => {
    ev.detail.register(10, (processNextHandler: () => void) => {
      console.log("Handler was called!");

      processNextHandler();
    });
  });
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <AnimesProvider>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/home/details-:animeId">
                <AnimeDetailsProvider>
                  <Details />
                </AnimeDetailsProvider>
              </Route>
              <Route exact path="/home/animes-type/:animeType/:title">
                <ListAnimesByType />
              </Route>
              <Route exact path="/home/genre-:genre">
                <ListAnimes />
              </Route>
              <Route exact path="/tab2">
                <Tab2 />
              </Route>
              <Route path="/tab3">
                <Tab3 />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route exact path="*">
                Not found
              </Route>
            </AnimesProvider>
          </IonRouterOutlet>
          <IonTabBar color="tertiary" slot="bottom">
            <IonTabButton tab="tab1" href="/home">
              <IonIcon icon={homeOutline} />
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon icon={fileTrayFullOutline} />
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon icon={star} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
