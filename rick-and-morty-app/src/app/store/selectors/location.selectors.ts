import { createFeatureSelector, createSelector } from '@ngrx/store'
import { LocationState } from '../reducers/location.reducer'

export const selectLocationState = createFeatureSelector<LocationState>('location') // kljuc reducer-a

export const selectLocations = createSelector(
	selectLocationState,
	(state: LocationState) => state.locations
)
