import { createReducer, on } from '@ngrx/store'
import * as CharacterActions from '../actions/character.actions'
import { Character } from 'src/app/models/Character'

export const featureKey = 'character' // kljuc na osnovu kojeg se referencira reducer

export interface CharacterState {
	characters: Character[]
	loading: boolean
	error: Error | null
}

export const initialState: CharacterState = {
	characters: [],
	loading: false,
	error: null
}

export const reducer = createReducer(
	initialState,

	on(CharacterActions.loadCharacters, state => ({ ...state, loading: true })),
	on(CharacterActions.loadCharactersSuccess, (state, { data }) => ({ ...state, characters: data, loading: false })),
	on(CharacterActions.loadCharactersFailure, (state, { error }) => ({ ...state, loading: false, error })),

	on(CharacterActions.loadSpecificCharacters, state => ({ ...state, loading: true })),
	on(CharacterActions.loadSpecificCharactersSuccess, (state, { data }) => ({ ...state, characters: data, loading: false })),
	on(CharacterActions.loadSpecificCharactersFailure, (state, { error }) => ({ ...state, loading: false, error }))
)
