import { createReducer, on } from '@ngrx/store'
import * as LocationActions from '../actions/location.actions'
import { Location } from 'src/app/models/Location'

export const featureKey = 'location'

export interface LocationState {
	locations: Location[]
	prevUrl: string | null
	nextUrl: string | null
	pages: number
	loading: boolean
	error: Error | null
}

export const initialState: LocationState = {
	locations: [],
	prevUrl: null,
	nextUrl: null,
	pages: 0,
	loading: false,
	error: null
}

export const reducer = createReducer(
	initialState,

	on(LocationActions.loadLocations, state => ({ ...state, loading: true })),
	on(LocationActions.loadLocationsSuccess, (state, { data, prevUrl, nextUrl, pages }) => ({ ...state, locations: data, prevUrl: prevUrl, nextUrl: nextUrl, pages: pages, loading: false })),
	on(LocationActions.loadLocationsFailure, (state, { error }) => ({ ...state, loading: false, error }))
)
