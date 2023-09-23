import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SuggestionState } from '../reducers/suggestion.reducer';


export const selectSuggestionFeature = createFeatureSelector<SuggestionState>('suggestion');

export const selectSuggestions = createSelector(
    selectSuggestionFeature,
    (state: SuggestionState) => state.suggestions
);

export const selectSuggestion = createSelector(
    selectSuggestionFeature,
    (state: SuggestionState) => state.selectedSuggestion
);