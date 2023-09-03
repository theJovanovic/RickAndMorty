import { createAction, props } from '@ngrx/store';

export const loadEpisodes = createAction('[Episode] Load Episodes', props<{ page: number }>());
export const loadEpisodesSuccess = createAction('[Episode] Load Episodes Success', props<{ data: any }>());
export const loadEpisodesFailure = createAction('[Episode] Load Episodes Failure', props<{ error: any }>());
