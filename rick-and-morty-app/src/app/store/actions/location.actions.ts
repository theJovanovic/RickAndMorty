import { createAction, props } from '@ngrx/store'
import { Location } from 'src/app/models/Location'

export const loadLocations = createAction('[Location] Load Locations', props<{ query: string }>())
export const loadLocationsSuccess = createAction('[Location] Load Locations Success', props<{ data: Location[], prevUrl: string | null, nextUrl: string | null, pages: number }>())
export const loadLocationsFailure = createAction('[Location] Load Locations Failure', props<{ error: Error }>())
