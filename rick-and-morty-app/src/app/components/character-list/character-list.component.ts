import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import * as CharacterActions from '../../store/actions/character.actions';
import { selectCharacters } from '../../store/selectors/character.selectors';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Character } from 'src/app/models/Character';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  characters$!: Observable<Character[]>;

  constructor(private route: ActivatedRoute, private store: Store) { }

  getCardColor(status: string): string {
    let color;
    switch (status) {
      case "Dead":
        color = `rgba(255, 0, 0, 0.6)`;
        break;
      case "Alive":
        color = `rgba(0, 255, 0, 0.6)`;
        break;
      default:
        color = `rgba(0, 0, 0, 0.4)`;
        break;
    }
    return color;
  }

  ngOnInit(): void {

    this.route.paramMap.pipe(
      tap((params) => {
        const page = +params.get("page")!
        this.store.dispatch(CharacterActions.loadCharacters({ page }));
      })
    ).subscribe();

    this.characters$ = this.store.select(selectCharacters); // getting a specific information from the store
  }
}
