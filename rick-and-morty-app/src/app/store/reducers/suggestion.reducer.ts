import { createReducer, on } from '@ngrx/store';
import * as SuggestionActions from "../actions/suggestion.actions";
import { Suggestion } from 'src/app/models/Suggestion';

export const featureKey = 'suggestion'

export interface SuggestionState {
    suggestions: Suggestion[],
    selectedSuggestion: Suggestion | null,
    loading: boolean;
    error: any;
}

const initialState: SuggestionState = {
    suggestions: [],
    selectedSuggestion: null,
    loading: false,
    error: null,
};

export const reducer = createReducer(
    initialState,

    on(SuggestionActions.sendSuggestion, state => ({
        ...state,
        loading: true,
        error: null
    })),

    on(SuggestionActions.sendSuggestionSuccess, (state, { newSuggestions }) => ({
        ...state,
        suggestions: newSuggestions,
        loading: false
    })),

    on(SuggestionActions.sendSuggestionFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(SuggestionActions.getAllSuggestion, state => ({
        ...state,
        loading: true,
        error: null
    })),

    on(SuggestionActions.getAllSuggestionSuccess, (state, { suggestions }) => ({
        ...state,
        suggestions: suggestions,
        loading: false
    })),

    on(SuggestionActions.getAllSuggestionFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
)