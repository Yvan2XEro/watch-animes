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
} from "@ionic/react";
import "./Details.css";
import {
  caretForwardCircleOutline,
  chevronBackCircleOutline,
  chevronForwardCircleOutline,
  shareSocial,
  star,
  starOutline,
} from "ionicons/icons";
import Loader from "../../components/Loader";
import { useAnimeDetails } from "../../contexts";
import Error from "../../components/Error";

export default function Details() {
  const {
    data,
    isLoading,
    resolutions,
    toggleAsFavourite,
    socialsShare,
    isFavourite,
    fetchingResolutions,
    playCurrentEpisode,
  } = useAnimeDetails();

  const Header = () => {
    return (
      <IonHeader className="ion-no-border" translucent collapse="fade">
        <IonToolbar color="secondary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              disabled={isLoading || fetchingResolutions || !data}
              fill="clear"
              onClick={socialsShare}
              shape="round"
              color={"light"}
            >
              <IonIcon icon={shareSocial} />
            </IonButton>
            <IonButton
              onClick={toggleAsFavourite}
              fill="clear"
              disabled={isLoading || fetchingResolutions || !data}
              shape="round"
              color={"light"}
            >
              <IonIcon icon={isFavourite ? star : starOutline} />
            </IonButton>
          </IonButtons>
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
                    disabled={
                      data?.totalEpisodes <= 0 ||
                      !resolutions ||
                      resolutions?.length <= 0
                    }
                    onClick={playCurrentEpisode}
                  >
                    <IonIcon size="large" icon={caretForwardCircleOutline} />
                  </IonButton>
                </div>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: "var(--ion-color-tertiary)" }}>
            <EpisodesSelect />
            <Resolutions />
          </div>
          <div>
            <DetailItem label="type" value={data?.type} />
            <DetailItem label="Release date" value={data?.releasedDate} />
            <DetailItem label="status" value={data?.status} />
            <DetailItem label="episodes count" value={data?.totalEpisodes} />
            <DetailItem label="Genres" value={data?.genres?.join(", ")} />
            <DetailItem
              label="synopsis"
              value={data?.synopsis?.replaceAll("\n", "<br/>")}
            />
          </div>
        </>
      );
    return <Error type="no-internet" />;
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
        dangerouslySetInnerHTML={{ __html: value?.toString() }}
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
          subHeader: "Choose an episode",
        }}
        placeholder="Select Episode"
        interface="action-sheet"
        style={{ flex: 1 }}
        value={episodeIndex}
        onIonChange={(ev) => goTo(ev.detail.value)}
      >
        {episodes.map((e, i) => (
          <IonSelectOption value={i} key={e.episodeId}>
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
          key={i}
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
