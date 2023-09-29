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

export const loadLocationPieCharts = createAction('[Location] Load Location Pie charts', props<{ location_id: number }>())
export const loadLocationPieChartsSuccess = createAction('[Location] Load Location Pie charts Success', props<{ locationPieChartSpecies: PieChart, locationPieChartEpisodes: PieChart }>())
export const loadLocationPieChartsFailure = createAction('[Location] Load Location Pie charts Failure', props<{ error: Error }>())