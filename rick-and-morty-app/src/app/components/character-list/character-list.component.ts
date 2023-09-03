import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CharacterActions from '../../store/actions/character.actions';
import { selectCharacters } from '../../store/selectors/character.selectors';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  
  characters$!: Observable<any>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Dispatch load characters action
    this.store.dispatch(CharacterActions.loadCharacters());

    // Use the selector to get characters from the store
    this.characters$ = this.store.select(selectCharacters);
  }

}
