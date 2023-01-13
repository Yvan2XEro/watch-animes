import {
  ActionSheetButton,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonThumbnail,
  useIonActionSheet,
} from "@ionic/react";
import { Anime } from "../../types";
import { substring } from "../../functions";
import { ellipsisVertical } from "ionicons/icons";

type ItemProps = {
  anime: Anime;
  bottom?: string;
  actions: ActionSheetButton<any>[];
};
export default function AnimeListItem({ anime, actions, bottom }: ItemProps) {
  const [actionSheet] = useIonActionSheet();
  return (
    <IonItem lines="none" color="none" href={"/home/details-" + anime.animeId}>
      <IonThumbnail slot="start">
        <img src={anime.animeImg} alt={anime.animeTitle} />
      </IonThumbnail>
      <IonLabel color={"medium"}>
        <p>{substring(anime.animeTitle, 45)}</p>
        <small>{bottom}</small>
      </IonLabel>
      <IonButton
        slot="end"
        fill="clear"
        size="small"
        color="light"
        shape="round"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          actionSheet(actions, anime.animeTitle);
        }}
      >
        <IonIcon icon={ellipsisVertical} />
      </IonButton>
    </IonItem>
  );
}
