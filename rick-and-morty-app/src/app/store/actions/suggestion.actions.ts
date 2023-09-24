import { createAction, props } from '@ngrx/store';
import { ReceivedSuggestion } from 'src/app/models/ReceivedSuggestion';
import { Suggestion } from 'src/app/models/Suggestion';

export const getAllSuggestion = createAction('[User] Get All Suggestion');
export const getAllSuggestionSuccess = createAction('[User] Get All Suggestion Success', props<{ suggestions: ReceivedSuggestion[] }>());
export const getAllSuggestionFailure = createAction('[User] Get All Suggestion Failure', props<{ error: Error }>());

export const sendSuggestion = createAction('[User] Send Suggestion', props<{ suggestion: Suggestion }>());
export const sendSuggestionSuccess = createAction('[User] Send Suggestion Success', props<{ newSuggestions: ReceivedSuggestion[] }>());
export const sendSuggestionFailure = createAction('[User] Send Suggestion Failure', props<{ error: Error }>());

export const setSuggestion = createAction('[User] Set Suggestion', props<{ suggestion: ReceivedSuggestion }>());
export const setSuggestionSuccess = createAction('[User] Set Suggestion Success', props<{ suggestion: ReceivedSuggestion }>());
export const setSuggestionFailure = createAction('[User] Set Suggestion Failure', props<{ error: Error }>());


export const addApprove = createAction('[User] Add Approve', props<{ id: number, userId: number }>());
export const addApproveSuccess = createAction('[User] Set Add Approve', props<{ suggestions: ReceivedSuggestion[] }>());
export const addApproveFailure = createAction('[User] Set Add Approve', props<{ error: Error }>());
