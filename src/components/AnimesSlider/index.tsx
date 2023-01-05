import { IonButton, IonLabel, IonRow, useIonRouter } from "@ionic/react";
import "./AnimesSlider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { substring } from "../../functions";
import AnimeCard from "../AnimeCard";
import { useQuery } from "react-query";
import { API_URL } from "../../data";
import { Anime } from "../../types";
import Loader from "../Loader";
type IAnimesSliderProps = {
  title: string;
  startUrl: string;
};
function AnimesSlider({ title, startUrl }: IAnimesSliderProps) {
  const { data, isLoading, error } = useQuery<Anime[]>(
    ["animes", startUrl],
    () => fetchAnimes(`${API_URL}/${startUrl}`)
  );
  const router = useIonRouter();

  return (
    <div className="animes-slider ion-padding-horizontal">
      <div className="slider-header">
        <IonLabel color="light">{title}</IonLabel>
        <IonButton
          onClick={() => router.push(`/home/animes-type/${startUrl}/${title}`)}
          fill="clear"
          color="light"
          size="small"
        >
          See all
        </IonButton>
      </div>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 1,
          },
          480: {
            slidesPerView: 4,
            spaceBetween: 1,
          },
          736: {
            slidesPerView: 5,
            spaceBetween: 1,
          },
          958: {
            slidesPerView: 6,
            spaceBetween: 1,
          },
          1241: {
            slidesPerView: 7,
            spaceBetween: 1,
          },
          1519: {
            slidesPerView: 8,
            spaceBetween: 1,
          },
        }}
        className="slider-content"
      >
        {data?.map((anime, i: number) => (
          <SwiperSlide key={i}>
            <AnimeCard anime={anime} key={i} />
          </SwiperSlide>
        ))}
        {isLoading && (
          <IonRow>
            <Loader loading />
          </IonRow>
        )}
      </Swiper>
    </div>
  );
}

export default AnimesSlider;

async function fetchAnimes(url: string) {
  const resp = await fetch(url);
  return await resp.json();
}
