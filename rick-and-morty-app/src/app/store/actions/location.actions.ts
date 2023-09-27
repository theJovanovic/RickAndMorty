import { createAction, props } from '@ngrx/store'
import { BarChart } from 'src/app/models/BarChart'
import { Location } from 'src/app/models/Location'
import { PieChart } from 'src/app/models/PieChart'

export const loadLocations = createAction('[Location] Load Locations', props<{ query: string }>())
export const loadLocationsSuccess = createAction('[Location] Load Locations Success', props<{ data: Location[], prevUrl: string | null, nextUrl: string | null, pages: number }>())
export const loadLocationsFailure = createAction('[Location] Load Locations Failure', props<{ error: Error }>())

export const loadCharts = createAction('[Location] Load Charts')
export const loadChartsSuccess = createAction('[Location] Load Charts Success', props<{ charactersChart: BarChart, episodesChart: BarChart, pieChart: PieChart }>())
export const loadChartsFailure = createAction('[Location] Load Charts Failure', props<{ error: Error }>())

export const loadLocationPieChart = createAction('[Location] Load Location Pie chart', props<{ location_id: number }>())
export const loadLocationPieChartSuccess = createAction('[Location] Load Location Pie chart Success', props<{ locationPieChart: PieChart }>())
export const loadLocationPieChartFailure = createAction('[Location] Load Location Pie chart Failure', props<{ error: Error }>())