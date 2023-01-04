import { IonButton, IonLabel, useIonRouter } from "@ionic/react";
import "./AnimesSlider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { substring } from "../../functions";
import AnimeCard from "../AnimeCard";
type IAnimesSliderProps = {
  title: string;
  filterKey: string;
  data: any[];
};
function AnimesSlider({ title, filterKey, data }: IAnimesSliderProps) {
  return (
    <div className="animes-slider ion-padding-horizontal">
      <div className="slider-header">
        <IonLabel color="light">{title}</IonLabel>
        <IonButton fill="clear" color="medium" size="small">
          See all
        </IonButton>
      </div>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 3,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 3,
          },
          736: {
            slidesPerView: 4,
            spaceBetween: 3,
          },
          958: {
            slidesPerView: 3,
            spaceBetween: 3,
          },
          1241: {
            slidesPerView: 6,
            spaceBetween: 3,
          },
          1519: {
            slidesPerView: 7,
            spaceBetween: 3,
          },
        }}
        className="slider-content"
      >
        {data.map((anime, i: number) => (
          <SwiperSlide key={i}>
            <AnimeCard anime={anime} key={i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AnimesSlider;
