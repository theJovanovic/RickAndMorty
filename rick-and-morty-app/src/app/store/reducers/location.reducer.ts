import { Action, createReducer, on } from '@ngrx/store';
import * as LocationActions from '../actions/location.actions';

export const locationFeatureKey = 'location'; // kljuc na osnovu kojeg se referencira reducer

export interface State {
  locations: any[];
  loading: boolean;
  error: any;
}

export const initialState: State = {
  locations: [],
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,

  on(LocationActions.loadLocations, state => ({ ...state, loading: true })),
  on(LocationActions.loadLocationsSuccess, (state, { data }) => ({ ...state, locations: data.results, loading: false })),
  on(LocationActions.loadLocationsFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
