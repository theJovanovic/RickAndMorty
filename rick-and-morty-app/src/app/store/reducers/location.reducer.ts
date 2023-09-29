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
	locationPieChartSpecies: PieChart | null
	locationPieChartEpisodes: PieChart | null
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
	locationPieChartSpecies: null,
	locationPieChartEpisodes: null,
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

	on(LocationActions.loadLocationPieCharts, state => ({ ...state, loading: true })),
	on(LocationActions.loadLocationPieChartsSuccess, (state, { locationPieChartSpecies, locationPieChartEpisodes }) => ({ ...state, locationPieChartSpecies: locationPieChartSpecies, locationPieChartEpisodes: locationPieChartEpisodes })),
	on(LocationActions.loadLocationPieChartsFailure, (state, { error }) => ({ ...state, loading: false, error }))
)
