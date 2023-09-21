import { createAction, props } from '@ngrx/store'
import { Episode } from 'src/app/models/Episode'

export const loadEpisodes = createAction('[Episode] Load Episodes', props<{ query: string }>())
export const loadEpisodesSuccess = createAction('[Episode] Load Episodes Success', props<{ data: Episode[], prevUrl: string | null, nextUrl: string | null, pages: number }>())
export const loadEpisodesFailure = createAction('[Episode] Load Episodes Failure', props<{ error: Error }>())

export const loadAllEpisodes = createAction('[Episode] Load All Episodes')
export const loadAllEpisodesSuccess = createAction('[Episode] Load All Episodes Success', props<{ data: Episode[] }>())
export const loadAllEpisodesFailure = createAction('[Episode] Load All Episodes Failure', props<{ error: Error }>())

export const loadEpisode = createAction('[Episode] Load Episode', props<{ id: number }>())
export const loadEpisodeSuccess = createAction('[Episode] Load Episode Success', props<{ data: Episode }>())
export const loadEpisodeFailure = createAction('[Episode] Load Episode Failure', props<{ error: Error }>())

export const likeEpisode = createAction('[Episode] Like Episode', props<{ id: number, user_id: number }>())
export const likeEpisodeSuccess = createAction('[Episode] Like Episode Success', props<{ episode: Episode }>())
export const likeEpisodeFailure = createAction('[Episode] Like Episode Failure', props<{ error: Error }>())

export const dislikeEpisode = createAction('[Episode] Dislike Episode', props<{ id: number, user_id: number }>())
export const dislikeEpisodeSuccess = createAction('[Episode] Dislike Episode Success', props<{ episode: Episode }>())
export const dislikeEpisodeFailure = createAction('[Episode] Dislike Episode Failure', props<{ error: Error }>())