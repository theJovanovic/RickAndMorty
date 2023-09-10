import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CharacterState } from '../reducers/character.reducer'

export const selectCharactersState = createFeatureSelector<CharacterState>('character')

export const selectCharacters = createSelector(
  selectCharactersState,
  (state: CharacterState) => state.characters
)

export const selectPrevUrl = createSelector(
  selectCharactersState,
  (state: CharacterState) => state.prevUrl
)

export const selectNextUrl = createSelector(
  selectCharactersState,
  (state: CharacterState) => state.nextUrl
)

export const selectTotalPages = createSelector(
  selectCharactersState,
  (state: CharacterState) => state.pages
)
