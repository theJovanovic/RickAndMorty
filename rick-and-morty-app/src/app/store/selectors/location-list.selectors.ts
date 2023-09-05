import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/location-list.reducer';

export const selectLocationState = createFeatureSelector<State>('location'); // kljuc reducer-a

export const selectLocations = createSelector(
    selectLocationState,
  (state: State) => state.locations
);
