import { createReducer, on } from '@ngrx/store';
import * as SuggestionActions from "../actions/suggestion.actions";
import { Suggestion } from 'src/app/models/Suggestion';
import { ReceivedSuggestion } from 'src/app/models/ReceivedSuggestion';

export const featureKey = 'suggestion'

export interface SuggestionState {
    suggestions: ReceivedSuggestion[],
    selectedSuggestion: ReceivedSuggestion | null,
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
        selectedSuggestion: newSuggestions[newSuggestions.length - 1],
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
        selectedSuggestion: suggestions[0],
        loading: false
    })),

    on(SuggestionActions.getAllSuggestionFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(SuggestionActions.setSuggestion, state => ({
        ...state,
        loading: true,
        error: null
    })),

    on(SuggestionActions.setSuggestionSuccess, (state, { suggestion }) => ({
        ...state,
        selectedSuggestion: suggestion,
        loading: false
    })),

    on(SuggestionActions.setSuggestionFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(SuggestionActions.addApprove, state => ({
        ...state,
        loading: true,
        error: null
    })),

    on(SuggestionActions.addApproveSuccess, (state, { suggestions }) => {

        return ({
            ...state,
            suggestions: suggestions,
            selectedSuggestion: suggestions[suggestions.length-1],
            loading: false
        })
    }),

    on(SuggestionActions.addApproveFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
)