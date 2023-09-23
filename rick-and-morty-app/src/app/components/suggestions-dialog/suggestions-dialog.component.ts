import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store'
import { Suggestion } from 'src/app/models/Suggestion';
import { API_URL } from 'src/app/services/rick-morty-api.service';
import * as suggestionActions from '../../store/actions/suggestion.actions'
import { Observable } from 'rxjs';
import { selectSuggestions } from 'src/app/store/selectors/suggestion.selectors';

@Component({
  selector: 'app-suggestions-dialog',
  templateUrl: './suggestions-dialog.component.html',
  styleUrls: ['./suggestions-dialog.component.css']
})
export class SuggestionsDialogComponent implements OnInit {
  showForm: boolean = false;
  suggestionForm!: FormGroup;
  suggestions$!: Observable<Suggestion[]>
  selectedSuggestion?: Suggestion

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [Validators.required]],
      plot: ['', [Validators.required]],
    });
    this.store.dispatch(suggestionActions.getAllSuggestion())
    this.suggestions$ = this.store.select(selectSuggestions)
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  selectSuggestion(suggestion: Suggestion) {
    this.selectedSuggestion = suggestion;
  }

  onSubmit() {
    if (this.suggestionForm.valid) {
      const form_data = this.suggestionForm.value;
      const suggestion = {
        ...form_data,
        creator: `${API_URL}/user/${0}`
      };
      this.store.dispatch(suggestionActions.sendSuggestion({ suggestion: suggestion }))
    } else {
      alert('Bad inputs. Please chech your suggestion again.')
    }
  }
}
