import { createAction, props } from '@ngrx/store'
import { Character } from 'src/app/models/Character'

export const loadCharacters = createAction('[Character] Load Characters', props<{ page: number }>())
export const loadCharactersSuccess = createAction('[Character] Load Characters Success', props<{ data: Character[] }>())
export const loadCharactersFailure = createAction('[Character] Load Characters Failure', props<{ error: Error }>())