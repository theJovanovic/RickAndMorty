import { createReducer, on } from '@ngrx/store'
import * as LocationActions from '../actions/location.actions'
import { Location } from 'src/app/models/Location'

export const featureKey = 'location' // kljuc na osnovu kojeg se referencira reducer

export interface LocationState {
  locations: Location[]
  loading: boolean
  error: Error | null
}

export const initialState: LocationState = {
  locations: [],
  loading: false,
  error: null
}

export const reducer = createReducer(
  initialState,

  on(LocationActions.loadLocations, state => ({ ...state, loading: true })),
  on(LocationActions.loadLocationsSuccess, (state, { data }) => ({ ...state, locations: data, loading: false })),
  on(LocationActions.loadLocationsFailure, (state, { error }) => ({ ...state, loading: false, error }))
)
