import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Character } from 'src/app/models/Character'
import { Episode } from 'src/app/models/Episode'
import * as CharacterActions from "../../store/actions/character.actions"
import * as EpisodeActions from "../../store/actions/episode.actions"
import { selectCharacters } from 'src/app/store/selectors/character.selectors'
import { Observable } from 'rxjs'
import { selectEpisode } from 'src/app/store/selectors/episode.selectors'
import { selectId } from 'src/app/store/selectors/user.selectors'

@Component({
  selector: 'app-episode-dialog',
  templateUrl: './episode-dialog.component.html',
  styleUrls: ['./episode-dialog.component.css']
})
export class EpisodeDialogComponent implements OnInit {
  episode_id: number
  charactersInEpisode$!: Observable<Character[]>;
  episode$!: Observable<Episode | null>
  id: number | null = null

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private store: Store) {
    this.episode_id = data
  }

  ngOnInit(): void {
    this.store.select(selectId).subscribe(id => this.id = id)
    this.store.dispatch(EpisodeActions.loadEpisode({ id: this.episode_id }))
    this.episode$ = this.store.select(selectEpisode)
    this.episode$.subscribe(episode => {
      if (episode != null) {
        const characterIds: string = this.extractCharacterIds(episode.characters)
        this.store.dispatch(CharacterActions.loadSpecificCharacters({ characterIds }))
        this.charactersInEpisode$ = this.store.select(selectCharacters)
      }
    })
  }

  private extractCharacterIds(characterUrls: string[]): string {
    const ids = characterUrls.map(url => url.split('/').pop());
    return ids.join(',');
  }

  getCircleShadowColor(status: string): string {
    let boxShadow: string
    switch (status) {
      case "Dead":
        boxShadow = `0 0 12px rgba(255, 0, 0, 0.6)`
        break
      case "Alive":
        boxShadow = `0 0 12px rgba(0, 255, 0, 0.6)`
        break
      default:
        boxShadow = `0 0 12px rgba(0, 0, 0, 0.4)`
        break
    }
    return boxShadow
  }

  like() {
    if (this.id) {
      this.store.dispatch(EpisodeActions.likeEpisode({ id: this.episode_id, user_id: this.id }))
    }
  }

  dislike() {
    if (this.id) {
      this.store.dispatch(EpisodeActions.dislikeEpisode({ id: this.episode_id, user_id: this.id }))
    }
  }

}
