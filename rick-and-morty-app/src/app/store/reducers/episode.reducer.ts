import { createReducer, on } from '@ngrx/store'
import * as EpisodeActions from '../actions/episode.actions'
import { Episode } from 'src/app/models/Episode'

export const featureKey = 'episode'

export interface EpisodeState {
    episodes: Episode[]
    prevUrl: string | null
	nextUrl: string | null
	pages: number
    loading: boolean
    error: Error | null
}
export const initialState: EpisodeState = {
    episodes: [],
    prevUrl: null,
	nextUrl: null,
	pages: 0,
    loading: false,
    error: null
}
export const reducer = createReducer(
    initialState,

    on(EpisodeActions.loadEpisodes, state => ({ ...state, loading: true })),
    on(EpisodeActions.loadEpisodesSuccess, (state, { data, prevUrl, nextUrl, pages }) => ({ ...state, episodes: data, prevUrl: prevUrl, nextUrl: nextUrl, pages: pages, loading: false })),
    on(EpisodeActions.loadEpisodesFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(EpisodeActions.loadAllEpisodes, state => ({ ...state, loading: true })),
    on(EpisodeActions.loadAllEpisodesSuccess, (state, { data }) => ({ ...state, episodes: data, loading: false })),
    on(EpisodeActions.loadAllEpisodesFailure, (state, { error }) => ({ ...state, loading: false, error })),
)