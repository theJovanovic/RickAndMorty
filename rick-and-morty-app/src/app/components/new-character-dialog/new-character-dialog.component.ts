import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { NewCharacter } from 'src/app/models/NewCharacter';
import { UserRole } from 'src/app/models/User';
import { API_URL } from 'src/app/services/rick-morty-api.service';
import { selectRole } from 'src/app/store/selectors/user.selectors';
import * as characterActions from '../../store/actions/character.actions'

@Component({
  selector: 'app-new-character-dialog',
  templateUrl: './new-character-dialog.component.html',
  styleUrls: ['./new-character-dialog.component.css']
})
export class NewCharacterDialogComponent implements OnInit {
  isUserAdmin: boolean = false;
  newCharacter: NewCharacter = {
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    image: '',
    origin: { url: "", name: "unknown" },
    location: { url: "", name: "unknown" },
    episode: [],
    url: `${API_URL}/character/`
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(selectRole).subscribe(role => {
      this.isUserAdmin = role === UserRole.ADMIN ? true : false
    })
  }

  createNewCharacter(): void {
    this.store.dispatch(characterActions.createCharacter({ character: this.newCharacter }))
    alert("User added")
  }
}
