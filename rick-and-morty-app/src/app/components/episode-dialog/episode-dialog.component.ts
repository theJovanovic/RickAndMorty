import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Character } from 'src/app/models/Character'
import { Episode } from 'src/app/models/Episode'
import * as CharacterActions from "../../store/actions/character.actions"
import { selectCharacters } from 'src/app/store/selectors/character.selectors'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-episode-dialog',
  templateUrl: './episode-dialog.component.html',
  styleUrls: ['./episode-dialog.component.css']
})
export class EpisodeDialogComponent implements OnInit {
  episode: Episode
  charactersInEpisode$!: Observable<Character[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Episode, private store: Store) {
    this.episode = data
  }

  ngOnInit(): void {
    const characterIds: string = this.extractCharacterIds(this.episode.characters)
    this.store.dispatch(CharacterActions.loadSpecificCharacters({ characterIds }))
    this.charactersInEpisode$ = this.store.select(selectCharacters)
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

}
