import { createFeatureSelector, createSelector } from '@ngrx/store'
import { EpisodeState } from '../reducers/episode-list.reducer'

export const selectEpisodeState = createFeatureSelector<EpisodeState>('episode') // kljuc reducer-a

export const selectEpisodes = createSelector(
  selectEpisodeState,
    (state: EpisodeState) => state.episodes
)

export const selectAllEpisodes = createSelector(
  selectEpisodeState,
  (state: EpisodeState) => state.allEpisodes
)
