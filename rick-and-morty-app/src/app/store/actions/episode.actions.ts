import { createAction, props } from '@ngrx/store'
import { Episode } from 'src/app/models/Episode'

export const loadEpisodes = createAction('[Episode] Load Episodes', props<{ page: number }>())
export const loadEpisodesSuccess = createAction('[Episode] Load Episodes Success', props<{ data: Episode[] }>())
export const loadEpisodesFailure = createAction('[Episode] Load Episodes Failure', props<{ error: Error }>())

export const loadAllEpisodes = createAction('[Episode] Load All Episodes')
export const loadAllEpisodesSuccess = createAction('[Episode] Load All Episodes Success',props<{ data: Episode[] }>())
export const loadAllEpisodesFailure = createAction('[Episode] Load All Episodes Failure',props<{ error: Error }>())