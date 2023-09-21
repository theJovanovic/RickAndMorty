import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import * as EpisodeActions from '../actions/episode.actions'
import { RickMortyApiService } from '../../services/rick-morty-api.service'
import { Episode } from 'src/app/models/Episode'

@Injectable()
export class EpisodeEffects {

  constructor(private actions$: Actions, private apiService: RickMortyApiService) { }

  loadEpisodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpisodeActions.loadEpisodes),
      mergeMap((action) => this.apiService.getEpisodes(action.query).pipe(
        map((data) => EpisodeActions.loadEpisodesSuccess({ data: data.results as Episode[], prevUrl: data.info.prev, nextUrl: data.info.next, pages: data.info.pages })),
        catchError(error => of(EpisodeActions.loadEpisodesFailure({ error })))
      ))
    )
  )

  loadEpisode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpisodeActions.loadEpisode),
      mergeMap((action) => this.apiService.getEpisode(action.id).pipe(
        map((data) => EpisodeActions.loadEpisodeSuccess({ data: data[0] as Episode })),
        catchError(error => of(EpisodeActions.loadEpisodeFailure({ error })))
      ))
    )
  )

  loadAllEpisodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpisodeActions.loadAllEpisodes),
      mergeMap(() =>
        this.apiService.getAllEpisodes().pipe(
          map((data) => EpisodeActions.loadAllEpisodesSuccess({ data: data })),
          catchError((error) => of(EpisodeActions.loadAllEpisodesFailure({ error })))
        )
      )
    )
  )

  likeEpisode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpisodeActions.likeEpisode),
      mergeMap((action) =>
        this.apiService.likeEpisode(action.id, action.user_id).pipe(
          map((episode) => EpisodeActions.likeEpisodeSuccess({ episode })),
          catchError((error) => of(EpisodeActions.likeEpisodeFailure({ error })))
        )
      )
    )
  )

  dislikeEpisode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpisodeActions.dislikeEpisode),
      mergeMap((action) =>
        this.apiService.dislikeEpisode(action.id, action.user_id).pipe(
          map((episode) => EpisodeActions.dislikeEpisodeSuccess({ episode })),
          catchError((error) => of(EpisodeActions.dislikeEpisodeFailure({ error })))
        )
      )
    )
  )
}
