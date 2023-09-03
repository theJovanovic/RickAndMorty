import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/character.reducer';

export const selectCharacterState = createFeatureSelector<State>('character'); // kljuc reducer-a

export const selectCharacters = createSelector(
  selectCharacterState,
  (state: State) => state.characters
);
