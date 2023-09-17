import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Character } from 'src/app/models/Character'
import { Episode } from 'src/app/models/Episode'
import { selectEpisodes } from 'src/app/store/selectors/episode.selectors'
import * as EpisodeActions from 'src/app/store/actions/episode.actions'
import { API_URL } from 'src/app/services/rick-morty-api.service'


@Component({
  selector: 'app-character-dialog',
  templateUrl: './character-dialog.component.html',
  styleUrls: ['./character-dialog.component.css']
})
export class CharacterDialogComponent implements OnInit {
  character: Character
  episodes$!: Observable<Episode[]>

  constructor(@Inject(MAT_DIALOG_DATA) public data: Character, private store: Store) {
    this.character = data
  }

  ngOnInit(): void {
    this.store.dispatch(EpisodeActions.loadAllEpisodes())
    this.episodes$ = this.store.select(selectEpisodes)
  }

  getBadgeColor(episodeId: number): string {
    const episodeUrl = `${API_URL}/episode/${episodeId}`
    console.log(this.character.episode)
    if (this.character.episode.includes(episodeUrl)) {
      return 'rgba(0, 255, 0, 1)'
    }
    return 'rgba(255, 255, 255, 0.4)'
  }

  getBadgePosition(index: number, total: number): { transform: string } {
    const angle = (360 / total) * index
    const a = 560
    const b = 300
    const x = a * Math.cos((angle - 90) * Math.PI / 180)
    const y = b * Math.sin((angle - 90) * Math.PI / 180)
    return {
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
    }
  }

}

