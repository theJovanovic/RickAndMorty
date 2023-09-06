import { createAction, props } from '@ngrx/store'
import { Location } from 'src/app/models/Location'

export const loadLocations = createAction('[Location] Load Locations', props<{ page: number }>())
export const loadLocationsSuccess = createAction('[Location] Load Locations Success', props<{ data: Location[] }>())
export const loadLocationsFailure = createAction('[Location] Load Locations Failure', props<{ error: Error }>())
