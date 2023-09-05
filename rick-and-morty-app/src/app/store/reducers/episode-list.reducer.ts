import { createReducer, on } from '@ngrx/store';
import * as EpisodeActions from '../actions/episode-list.actions';
import { Episode } from 'src/app/models/Episode';

export const locationFeatureKey = 'episode'; // kljuc na osnovu kojeg se referencira reducer

export interface State {
    episodes: Episode[];
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
    on(EpisodeActions.loadEpisodesSuccess, (state, { data }) => ({ ...state, episodes: data, loading: false })),
    on(EpisodeActions.loadEpisodesFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
