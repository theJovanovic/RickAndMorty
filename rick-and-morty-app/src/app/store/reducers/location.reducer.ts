import { createReducer, on } from '@ngrx/store'
import * as LocationActions from '../actions/location.actions'
import { Location } from 'src/app/models/Location'
import { PieChart } from 'src/app/models/PieChart'
import { BarChart } from 'src/app/models/BarChart'

export const featureKey = 'location'

export interface LocationState {
	locations: Location[]
	prevUrl: string | null
	nextUrl: string | null
	pages: number
	charactersChart: BarChart | null
	episodesChart: BarChart | null
	pieChart: PieChart | null
	locationPieChart: PieChart | null
	loading: boolean
	error: Error | null
}

export const initialState: LocationState = {
	locations: [],
	prevUrl: null,
	nextUrl: null,
	pages: 0,
	charactersChart: null,
	episodesChart: null,
	pieChart: null,
	locationPieChart: null,
	loading: false,
	error: null
}

export const reducer = createReducer(
	initialState,

	on(LocationActions.loadLocations, state => ({ ...state, loading: true })),
	on(LocationActions.loadLocationsSuccess, (state, { data, prevUrl, nextUrl, pages }) => ({ ...state, locations: data, prevUrl: prevUrl, nextUrl: nextUrl, pages: pages, loading: false })),
	on(LocationActions.loadLocationsFailure, (state, { error }) => ({ ...state, loading: false, error })),

	on(LocationActions.loadCharts, state => ({ ...state, loading: true })),
	on(LocationActions.loadChartsSuccess, (state, { charactersChart, episodesChart, pieChart }) => ({ ...state, charactersChart: charactersChart, episodesChart: episodesChart, pieChart: pieChart })),
	on(LocationActions.loadChartsFailure, (state, { error }) => ({ ...state, loading: false, error })),

	on(LocationActions.loadLocationPieChart, state => ({ ...state, loading: true })),
	on(LocationActions.loadLocationPieChartSuccess, (state, { locationPieChart }) => ({ ...state, locationPieChart: locationPieChart })),
	on(LocationActions.loadLocationPieChartFailure, (state, { error }) => ({ ...state, loading: false, error }))
)
