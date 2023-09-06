import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CharacterState } from '../reducers/character-list.reducer'

export const selectCharactersState = createFeatureSelector<CharacterState>('character') // kljuc reducer-a

export const selectCharacters = createSelector(
  selectCharactersState,
  (state: CharacterState) => state.characters
)
