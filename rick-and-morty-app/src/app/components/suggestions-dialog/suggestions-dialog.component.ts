import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'

interface Suggestion {
  name: string;
  creator: string;
  date: string;
  plot: string;
}

@Component({
  selector: 'app-suggestions-dialog',
  templateUrl: './suggestions-dialog.component.html',
  styleUrls: ['./suggestions-dialog.component.css']
})
export class SuggestionsDialogComponent implements OnInit {
  suggestions: Suggestion[] = [
    { name: 'Suggestion 1Suggestion 1Suggestion 1Suggestion 1Suggestion 1Suggestion 1', creator: 'John', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 2', creator: 'Jane', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 1', creator: 'John', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 2', creator: 'Jane', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 1', creator: 'John', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 2', creator: 'Jane', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 1', creator: 'John', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 2', creator: 'Jane', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 1', creator: 'John', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 2', creator: 'Jane', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 1', creator: 'John', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 2', creator: 'Jane', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 1', creator: 'John', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 2', creator: 'Jane', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 1', creator: 'John', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 2', creator: 'Jane', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 1', creator: 'John', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 2', creator: 'Jane', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 1', creator: 'John', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 2', creator: 'Jane', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 1', creator: 'John', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 2', creator: 'Jane', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 1', creator: 'John', date: '2023-09-18', plot: 'Lorem ipsum...' },
    { name: 'Suggestion 2', creator: 'Jane', date: '2023-09-18', plot: 'Lorem ipsum...' },
  ];
  selectedSuggestion?: Suggestion

  constructor() {}

  ngOnInit(): void {
  }

  selectSuggestion(suggestion: Suggestion) {
    this.selectedSuggestion = suggestion;
  }
}
