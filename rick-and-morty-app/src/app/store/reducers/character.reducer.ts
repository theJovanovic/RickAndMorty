import { createReducer, on } from '@ngrx/store';
import * as CharacterActions from '../actions/character.actions';
import { Character } from 'src/app/models/Character';

export const characterFeatureKey = 'character'; // kljuc na osnovu kojeg se referencira reducer

export interface State {
  characters: Character[];
  loading: boolean;
  error: any;
}

export const initialState: State = {
  characters: [],
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,

  on(CharacterActions.loadCharacters, state => ({ ...state, loading: true })),
  on(CharacterActions.loadCharactersSuccess, (state, { data }) => ({ ...state, characters: data, loading: false })),
  on(CharacterActions.loadCharactersFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
