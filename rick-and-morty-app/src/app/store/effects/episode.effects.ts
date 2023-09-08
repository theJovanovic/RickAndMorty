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
      mergeMap((action) => this.apiService.getEpisodes(action.page).pipe(
        map((data) => EpisodeActions.loadEpisodesSuccess({ data: data.results as Episode[] })),
        catchError(error => of(EpisodeActions.loadEpisodesFailure({ error })))
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
}
