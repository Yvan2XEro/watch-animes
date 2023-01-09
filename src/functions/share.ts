import { Anime } from "../types";
import { SocialSharing } from '@ionic-native/social-sharing'

export function socialsShare(anime: Anime) {
    return SocialSharing.share("Share this anime to your friends", anime.animeTitle, undefined, anime.animeId);
}