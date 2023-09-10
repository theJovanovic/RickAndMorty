import { createFeatureSelector, createSelector } from '@ngrx/store'
import { LocationState } from '../reducers/location.reducer'

export const selectLocationState = createFeatureSelector<LocationState>('location')

export const selectLocations = createSelector(
	selectLocationState,
	(state: LocationState) => state.locations
)

export const selectPrevUrl = createSelector(
	selectLocationState,
	(state: LocationState) => state.prevUrl
  )
  
  export const selectNextUrl = createSelector(
	selectLocationState,
	(state: LocationState) => state.nextUrl
  )
  
  export const selectTotalPages = createSelector(
	selectLocationState,
	(state: LocationState) => state.pages
  )
  