import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import "./Details.css";
import {
  caretForwardCircleOutline,
  chevronBackCircleOutline,
  chevronForwardCircleOutline,
  saveOutline,
  starOutline,
} from "ionicons/icons";
import Loader from "../../components/Loader";
import { useAnimeDetails } from "../../contexts/anime-details";

export default function Details() {
  const router = useIonRouter();
  const { data, error, isLoading, playCurrentEpisode } = useAnimeDetails();

  const Header = () => {
    return (
      <IonHeader className="ion-no-border" translucent collapse="fade">
        <IonToolbar color="secondary">
          {!error ? (
            <>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/"></IonBackButton>
              </IonButtons>
              <IonButtons slot="end">
                <IonButton fill="clear" shape="round" color={"light"}>
                  <IonIcon icon={saveOutline} />
                </IonButton>
                <IonButton fill="clear" shape="round" color={"light"}>
                  <IonIcon icon={starOutline} />
                </IonButton>
              </IonButtons>
            </>
          ) : (
            <IonButtons>
              <IonButton onClick={() => router.push("/")} color="danger">
                Cancel
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
    );
  };

  const HandledContent = () => {
    if (isLoading) return <Loader loading={isLoading} />;
    if (!!data)
      return (
        <>
          <div
            className="bg_img"
            style={{
              backgroundImage: `linear-gradient(transparent 5%, var(--ion-color-tertiary)) , url('${data?.animeImg}')`,
            }}
          >
            <div className="img_wrapper">
              <div className="ion-padding-horizontal titles">
                <div>
                  <h3 color="light">{data?.otherNames}</h3>
                  <IonLabel color="light">{data?.animeTitle}</IonLabel>
                </div>
                <div className="button">
                  <IonButton
                    shape="round"
                    fill="clear"
                    size="large"
                    color="light"
                    disabled={data?.totalEpisodes <= 0}
                    onClick={playCurrentEpisode}
                  >
                    <IonIcon size="large" icon={caretForwardCircleOutline} />
                  </IonButton>
                </div>
              </div>
            </div>
          </div>
          <EpisodesSelect />
          <Resolutions />
          <div>
            <DetailItem label="type" value={data?.type} />
            <DetailItem label="Release date" value={data?.releasedDate} />
            <DetailItem label="status" value={data?.status} />
            <DetailItem label="episodes count" value={data?.totalEpisodes} />
            <DetailItem label="Genres" value={data?.genres.join(", ")} />
            <DetailItem
              label="synopsis"
              value={data?.synopsis.replaceAll("\n", "<br/>")}
            />
          </div>
        </>
      );
    return <>Error</>;
  };

  return (
    <IonPage>
      <Header />
      <IonContent>
        <HandledContent />
      </IonContent>
    </IonPage>
  );
}

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <IonItem color={"tertiary"}>
    <div className="details-item">
      <h6>{label}:</h6>
      <div
        className="text-small"
        dangerouslySetInnerHTML={{ __html: value.toString() }}
      ></div>
    </div>
  </IonItem>
);

const EpisodesSelect = () => {
  const { episodes, isLast, isFirst, next, back, episodeIndex, goTo } =
    useAnimeDetails();

  return (
    <div className="episode_select">
      <IonButton
        disabled={isLast}
        onClick={next}
        fill="clear"
        shape="round"
        color={"light"}
        size="large"
      >
        <IonIcon icon={chevronBackCircleOutline} />
      </IonButton>
      <IonSelect
        interfaceOptions={{
          header: "Episode",
          subHeader: "Choisir une episode",
        }}
        placeholder="Select Episode"
        interface="action-sheet"
        style={{ flex: 1 }}
        value={episodeIndex}
        onIonChange={(ev) => goTo(ev.detail.value)}
      >
        {episodes.map((e, i) => (
          <IonSelectOption value={i} key={i}>
            <IonLabel>Episode: {e.episodeNum}</IonLabel>
          </IonSelectOption>
        ))}
      </IonSelect>
      <IonButton
        disabled={isFirst}
        onClick={back}
        fill="clear"
        shape="round"
        color={"light"}
        size="large"
      >
        <IonIcon icon={chevronForwardCircleOutline} />
      </IonButton>
    </div>
  );
};

function Resolutions() {
  const { resolutions, fetchingResolutions, play } = useAnimeDetails();

  if (fetchingResolutions)
    return (
      <div>
        <Loader loading />
      </div>
    );
  return (
    <div className="reolutions ion-padding-horizontal">
      {resolutions?.map((r, i) => (
        <IonButton
          key={r.file}
          color={i === 0 ? "success" : "primary"}
          shape="round"
          onClick={() => play(r.file)}
          size="small"
        >
          {r.label}
        </IonButton>
      ))}
    </div>
  );
}
