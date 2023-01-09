import { IonItem, IonSearchbar, useIonRouter } from "@ionic/react";
import { useState } from "react";
import { Anime } from "../../types";
import { substring } from "../../functions";
import { Virtuoso } from "react-virtuoso";

export default function AppSearch() {
  const router = useIonRouter();
  let [results, setResults] = useState<Anime[]>([]);
  const handleChange = async (ev: Event) => {
    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    await fetch(`https://gogoanime.consumet.org/search?keyw=${query}`)
      .then((response) => response.json())
      .then(setResults);
  };
  return (
    <div>
      <IonSearchbar
        onIonChange={(ev) => handleChange(ev)}
        onIonCancel={() => setResults([])}
        color={"secondary"}
      ></IonSearchbar>
      {results.length > 0 && (
        <Virtuoso
          data={results}
          initialTopMostItemIndex={0}
          className="ion-content-scroll-host"
          itemContent={(i, result) => (
            <IonItem
              color="secondary"
              onClick={() => router.push("/home/details-" + result.animeId)}
            >
              {substring(result.animeTitle, 30)}
            </IonItem>
          )}
          style={{ minHeight: "100vh" }}
        />
      )}
    </div>
  );
}
