import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  isPlatform,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { compassOutline, list, settingsOutline, star } from "ionicons/icons";

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
import { AppAnimesClientProvider } from "./contexts/app-animes-client";
import ListAnimes from "./pages/ListAnimes";
import { StatusBar } from "@awesome-cordova-plugins/status-bar";
import { AnimeDetailsProvider } from "./contexts";
import ListAnimesByType from "./pages/ListAnimesByType";
import Favourites from "./pages/Favourites";
import { useNetworkStatus } from "./hooks";
import AppExternalUrlListener from "./components/AppExternalUrlListener";
import { ErrorsFetchingProvider } from "./contexts/error-fetching";
import MyRecents from "./pages/MyRecents";
import { useEffect } from "react";
import Settings from "./pages/Setting";
import About from "./pages/About";

setupIonicReact();

const App: React.FC = () => {
  useNetworkStatus();
  // useSplashScreen();
  useEffect(() => {
    if (isPlatform("mobile")) {
      StatusBar.overlaysWebView(false);
      StatusBar.backgroundColorByHexString("#343466");
    }
  }, []);
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <AppAnimesClientProvider>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route exact path="/home">
                <ErrorsFetchingProvider>
                  <Home />
                </ErrorsFetchingProvider>
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
              <Route exact path="/my-recents">
                <MyRecents />
              </Route>
              <Route exact path="/my-favourites">
                <Favourites />
              </Route>
              <Route exact path="/settings">
                <Settings />
              </Route>
              <Route exact path="/settings/about">
                <About />
              </Route>
              {/* <Redirect to="/empty" />
              <Route path="/empty">
                <Empty />
              </Route> */}
            </AppAnimesClientProvider>
          </IonRouterOutlet>
          <IonTabBar color="tertiary" slot="bottom">
            <IonTabButton tab="tab1" href="/home">
              <IonIcon icon={compassOutline} />
              <IonLabel>Browser</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/my-recents">
              <IonIcon icon={list} />
              <IonLabel>My Recents</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/my-favourites">
              <IonIcon icon={star} />
              <IonLabel>Favourites</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab4" href="/settings">
              <IonIcon icon={settingsOutline} />
              <IonLabel>Sttings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
        <AppExternalUrlListener />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
