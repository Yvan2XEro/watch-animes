import React from "react";
import { Anime } from "../../types";
import { substring } from "../../functions";
import { useIonRouter } from "@ionic/react";

export default function AnimeCard({ anime }: { anime: Anime }) {
  const router = useIonRouter();
  return (
    <div
      onClick={() => router.push("/home/details-" + anime.animeId)}
      className="anime-item "
    >
      <img
        height={150}
        width={100}
        className="anime-item-img"
        src={anime.animeImg}
      />
      <small className="" color="light">
        {substring(anime.animeTitle, 14)}
      </small>
    </div>
  );
}
