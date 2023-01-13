export type Anime = {
    animeId: string
    animeTitle: string
    animeImg: string
}

export type Episode = {
    episodeId: string
    episodeNum: string
    episodeUrl: string
    resolutions?: StreamingItem[]
}

export type AnimeDetails = {
    animeTitle: string
    type: string
    releasedDate: number
    status: string
    genres: string[]
    otherNames: string
    synopsis: string
    animeImg: string
    totalEpisodes: number
    episodesList: Episode[]
}

export type StreamingItem = {
    file: string
    label: string
    type: string
}

export type AnimeRecent = {
    anime: Anime,
    date: Date,
    lastEpisode: Episode
}
