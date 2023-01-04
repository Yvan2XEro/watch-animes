import { IonSpinner } from "@ionic/react";

type Props = {
  loading: boolean;
};

export default function Loader({ loading }: Props) {
  if (loading)
    return (
      <div
        style={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IonSpinner color="light" />
      </div>
    );
  return null;
}
