import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, switchMap, tap } from 'rxjs'
import * as CharacterActions from '../../store/actions/character.actions'
import { selectCharacters } from '../../store/selectors/character.selectors'
import { Character } from 'src/app/models/Character'
import { MatDialog } from '@angular/material/dialog'
import { CharacterDialogComponent } from '../character-dialog/character-dialog.component'

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  characters$!: Observable<Character[]>

  constructor(private store: Store, private dialog: MatDialog) { }

  ngOnInit(): void {
    const queryString = window.location.search.substring(1)
    this.store.dispatch(CharacterActions.loadCharacters({ query: queryString }))
    this.characters$ = this.store.select(selectCharacters)
  }

  getCardColor(status: string): string {
    let color
    switch (status) {
      case "Dead":
        color = `rgba(255, 0, 0, 0.6)`
        break
      case "Alive":
        color = `rgba(0, 255, 0, 0.6)`
        break
      default:
        color = `rgba(0, 0, 0, 0.4)`
        break
    }
    return color
  }

  onCharacterClick(character: Character): void {
    this.dialog.open(CharacterDialogComponent, { data: character })
  }


}
