import { createAction, props } from '@ngrx/store';
import { Suggestion } from 'src/app/models/Suggestion';

export const getAllSuggestion = createAction('[User] Get All Suggestion');
export const getAllSuggestionSuccess = createAction('[User] Get All Suggestion Success', props<{ suggestions: Suggestion[] }>());
export const getAllSuggestionFailure = createAction('[User] Get All Suggestion Failure', props<{ error: Error }>());

export const sendSuggestion = createAction('[User] Send Suggestion', props<{ suggestion: Suggestion }>());
export const sendSuggestionSuccess = createAction('[User] Send Suggestion Success', props<{ newSuggestions: Suggestion[] }>());
export const sendSuggestionFailure = createAction('[User] Send Suggestion Failure', props<{ error: Error }>());
