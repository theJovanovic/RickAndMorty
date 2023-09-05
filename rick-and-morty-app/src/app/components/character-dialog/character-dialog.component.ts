import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Character } from 'src/app/models/Character';

@Component({
  selector: 'app-character-dialog',
  templateUrl: './character-dialog.component.html',
  styleUrls: ['./character-dialog.component.css']
})
export class CharacterDialogComponent {
  character: Character;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Character) {
    this.character = data;
  }

}
