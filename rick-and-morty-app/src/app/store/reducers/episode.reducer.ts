import { createReducer, on } from '@ngrx/store'
import * as EpisodeActions from '../actions/episode.actions'
import { Episode } from 'src/app/models/Episode'

export const featureKey = 'episode' // kljuc na osnovu kojeg se referencira reducer

export interface EpisodeState {
    episodes: Episode[]
    loading: boolean
    error: Error | null
}
export const initialState: EpisodeState = {
    episodes: [],
    loading: false,
    error: null
}
export const reducer = createReducer(
    initialState,

    on(EpisodeActions.loadEpisodes, state => ({ ...state, loading: true })),
    on(EpisodeActions.loadEpisodesSuccess, (state, { data }) => ({ ...state, episodes: data, loading: false })),
    on(EpisodeActions.loadEpisodesFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(EpisodeActions.loadAllEpisodes, state => ({ ...state, loading: true })),
    on(EpisodeActions.loadAllEpisodesSuccess, (state, { data }) => ({ ...state, episodes: data, loading: false })),
    on(EpisodeActions.loadAllEpisodesFailure, (state, { error }) => ({ ...state, loading: false, error })),
)