import { IonButton, useIonRouter } from "@ionic/react";
import { genres } from "../../data";
import "./index.css";

export default function FiltersGenresButtons() {
  const router = useIonRouter();
  return (
    <div className="filters-buttons">
      {genres.map((g) => (
        <IonButton
          onClick={() => router.push(`home/genre-${g}`)}
          key={g}
          color="tertiary"
          shape="round"
          size="small"
        >
          {g.replaceAll("-", " ")}
        </IonButton>
      ))}
    </div>
  );
}
