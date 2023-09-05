import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/episode-list.reducer';

export const selectEpisodeState = createFeatureSelector<State>('episode'); // kljuc reducer-a

export const selectEpisodes = createSelector(
    selectEpisodeState,
    (state: State) => state.episodes
);
