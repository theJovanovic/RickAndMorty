import { Action, createReducer, on } from '@ngrx/store';
import * as CharacterActions from '../actions/character.actions';

export const characterFeatureKey = 'character';

export interface State {
  characters: any[];
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
  on(CharacterActions.loadCharactersSuccess, (state, { data }) => ({ ...state, characters: data.results, loading: false })),
  on(CharacterActions.loadCharactersFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
