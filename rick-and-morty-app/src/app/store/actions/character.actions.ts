import { createAction, props } from '@ngrx/store';

export const loadCharacters = createAction('[Character] Load Characters');
export const loadCharactersSuccess = createAction('[Character] Load Characters Success', props<{ data: any }>());
export const loadCharactersFailure = createAction('[Character] Load Characters Failure', props<{ error: any }>());
