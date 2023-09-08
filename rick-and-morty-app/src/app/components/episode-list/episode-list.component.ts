import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { selectEpisodes } from 'src/app/store/selectors/episode.selectors'
import * as EpisodeActions from '../../store/actions/episode.actions'
import { ActivatedRoute } from '@angular/router'
import { Episode } from 'src/app/models/Episode'
import { MatDialog } from '@angular/material/dialog'
import { EpisodeDialogComponent } from '../episode-dialog/episode-dialog.component'

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.css']
})
export class EpisodeListComponent implements OnInit {
  episodes$!: Observable<Episode[]>
  seasonColorMap: { [season: string]: string } = {}

  constructor(private route: ActivatedRoute, private store: Store, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const page = +params.get("page")!
      this.store.dispatch(EpisodeActions.loadEpisodes({ page }))
    })

    this.episodes$ = this.store.select(selectEpisodes)
  }

  onEpisodeClick(episode: Episode): void {
    this.dialog.open(EpisodeDialogComponent, { data: episode })
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



}