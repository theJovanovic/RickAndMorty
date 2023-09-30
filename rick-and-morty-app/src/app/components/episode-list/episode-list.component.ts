import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, combineLatest, map, mergeMap, of, switchMap, tap } from 'rxjs'
import { selectEpisodes, selectNextUrl, selectPrevUrl } from 'src/app/store/selectors/episode.selectors'
import * as EpisodeActions from '../../store/actions/episode.actions'
import * as AdminActions from '../../store/actions/admin.actions'
import { Episode } from 'src/app/models/Episode'
import { MatDialog } from '@angular/material/dialog'
import { EpisodeDialogComponent } from '../episode-dialog/episode-dialog.component'
import { selectId, selectRole } from 'src/app/store/selectors/user.selectors'
import { SuggestionsDialogComponent } from '../suggestions-dialog/suggestions-dialog.component'

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.css']
})
export class EpisodeListComponent implements OnInit {
  episodes$!: Observable<Episode[]>
  seasonColorMap: { [season: string]: string } = {}
  id: number | null = null
  isUserAdmin: boolean = false

  constructor(private store: Store, private dialog: MatDialog) { }

  ngOnInit(): void {
    const queryString = window.location.search.substring(1)
    this.store.dispatch(EpisodeActions.loadEpisodes({ query: queryString }))
    this.episodes$ = this.store.select(selectEpisodes)
    this.store.select(selectId).subscribe(id => this.id = id)
    this.store.select(selectRole).subscribe(role => {
      this.isUserAdmin = role === "admin" ? true : false
    })
  }

  onEpisodeClick(episode: Episode): void {
    this.dialog.open(EpisodeDialogComponent, { data: episode.id })
      .afterClosed().subscribe(_ => {
        this.store.select(selectNextUrl)
          .pipe(
            switchMap(nextUrl => {
              if (nextUrl) {
                return of(nextUrl.replace(/page=(\d+)/, (_, p1) => `page=${parseInt(p1, 10) - 1}`).split('?')[1])
              } else {
                return this.store.select(selectPrevUrl).pipe(
                  map(prevUrl => prevUrl ? prevUrl.replace(/page=(\d+)/, (_, p1) => `page=${parseInt(p1, 10) + 1}`).split('?')[1] : "")
                );
              }
            }),
            tap(finalUrl => {
              if (finalUrl) {
                this.store.dispatch(EpisodeActions.loadEpisodes({ query: finalUrl }))
              }
            })
          )
          .subscribe();
      })
  }

  getCardColor(episode: string): string {
    const season = episode.substring(1, 3)
    if (!this.seasonColorMap[season]) {
      this.seasonColorMap[season] = this.getRandomColor()
    }
    return this.seasonColorMap[season]
  }

  getRandomColor(opacity: number = 0.5): string {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  openSuggestions() {
    this.dialog.open(SuggestionsDialogComponent)
  }

  deleteEpisode(epsiodeId: number) {
    if (window.confirm("Are you sure you want to proceed?")) {
      this.store.dispatch(AdminActions.deleteEpisode({ episodeId: epsiodeId }))
    }
  }

}