import { Anime } from "../types";
import { useLocalStorage } from "usehooks-ts";

export function useFavourites() {
  const [animes, setAnimes] = useLocalStorage<Anime[]>("favourites-animes", []);

  function isFavourite(anime: Anime): boolean {
    return !!animes.find(({ animeId }) => anime.animeId === animeId);
  }

  function addToFavourites(anime: Anime) {
    setAnimes((previousAnimes) => [...previousAnimes, anime]);
  }

  function removeFromFavourites(anime: Anime) {
    setAnimes((animes) => animes.filter((a) => a.animeId !== anime.animeId));
  }

  function toggleAsFavourite(anime: Anime) {
    if (!isFavourite(anime)) return addToFavourites(anime);
    return removeFromFavourites(anime);
  }

  return {
    animes: animes.reverse(),
    isFavourite,
    addToFavourites,
    toggleAsFavourite,
    removeFromFavourites,
  };
}
