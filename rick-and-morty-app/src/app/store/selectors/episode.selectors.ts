import { createFeatureSelector, createSelector } from '@ngrx/store'
import { EpisodeState } from '../reducers/episode.reducer'

export const selectEpisodeState = createFeatureSelector<EpisodeState>('episode') // kljuc reducer-a

export const selectEpisodes = createSelector(
	selectEpisodeState,
	(state: EpisodeState) => state.episodes
)
