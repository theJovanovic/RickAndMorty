import { createFeatureSelector, createSelector } from '@ngrx/store'
import { EpisodeState } from '../reducers/episode.reducer'

export const selectEpisodeState = createFeatureSelector<EpisodeState>('episode')

export const selectEpisodes = createSelector(
	selectEpisodeState,
	(state: EpisodeState) => state.episodes
)

export const selectPrevUrl = createSelector(
	selectEpisodeState,
	(state: EpisodeState) => state.prevUrl
  )
  
  export const selectNextUrl = createSelector(
	selectEpisodeState,
	(state: EpisodeState) => state.nextUrl
  )
  
  export const selectTotalPages = createSelector(
	selectEpisodeState,
	(state: EpisodeState) => state.pages
  )
  