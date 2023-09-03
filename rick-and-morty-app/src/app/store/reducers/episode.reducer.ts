import { Action, createReducer, on } from '@ngrx/store';
import * as EpisodeActions from '../actions/episode.actions';

export const locationFeatureKey = 'episode'; // kljuc na osnovu kojeg se referencira reducer

export interface State {
    episodes: any[];
    loading: boolean;
    error: any;
}

export const initialState: State = {
    episodes: [],
    loading: false,
    error: null
};

export const reducer = createReducer(
    initialState,

    on(EpisodeActions.loadEpisodes, state => ({ ...state, loading: true })),
    on(EpisodeActions.loadEpisodesSuccess, (state, { data }) => ({ ...state, episodes: data.results, loading: false })),
    on(EpisodeActions.loadEpisodesFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
