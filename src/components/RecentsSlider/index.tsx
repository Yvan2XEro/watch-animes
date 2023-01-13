import { IonButton, IonLabel, useIonRouter } from "@ionic/react";
import { substring } from "../../functions";
import { useAnimesRecents } from "../../hooks";
import { AnimeRecent } from "../../types";
import "./index.css";

export default function RecentsSlider() {
  const { recentsAnimes } = useAnimesRecents();
  const router = useIonRouter();

  if (recentsAnimes.length === 0) return <></>;
  return (
    <div className="ion-padding-horizontal recents-list-wrapper">
      <div className="slider-header">
        <IonLabel color="light">Recently viewed</IonLabel>
        <IonButton
          onClick={() => router.push(`/my-recents`)}
          fill="clear"
          color="light"
          size="small"
        >
          See all
        </IonButton>
      </div>
      <div className="recents-list">
        {recentsAnimes.map((r, i) => (
          <RecentListItem item={r} key={i} />
        ))}
      </div>
    </div>
  );
}

function RecentListItem({ item }: { item: AnimeRecent }) {
  const { anime, lastEpisode } = item;
  const router = useIonRouter();

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(transparent 5%, var(--ion-color-tertiary)) , url('${anime.animeImg}')`,
      }}
      onClick={() => router.push("/home/details-" + anime.animeId)}
      className="ion-padding recent-list-item"
    >
      <IonLabel color="light">
        Resume episode {lastEpisode.episodeNum} of ``
        {substring(anime.animeTitle, 35)}``
      </IonLabel>
    </div>
  );
}
