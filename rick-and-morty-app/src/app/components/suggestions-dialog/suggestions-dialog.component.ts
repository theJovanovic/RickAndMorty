import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store'
import { Suggestion } from 'src/app/models/Suggestion';
import { API_URL } from 'src/app/services/rick-morty-api.service';
import * as suggestionActions from '../../store/actions/suggestion.actions'
import { Observable } from 'rxjs';
import { selectSuggestion, selectSuggestions } from 'src/app/store/selectors/suggestion.selectors';
import { selectId } from 'src/app/store/selectors/user.selectors';
import { ReceivedSuggestion } from 'src/app/models/ReceivedSuggestion';
import { selectCharacters } from 'src/app/store/selectors/character.selectors';

@Component({
  selector: 'app-suggestions-dialog',
  templateUrl: './suggestions-dialog.component.html',
  styleUrls: ['./suggestions-dialog.component.css']
})
export class SuggestionsDialogComponent implements OnInit {
  suggestionForm!: FormGroup;
  suggestions$!: Observable<ReceivedSuggestion[]>
  selectedSuggestion$?: Observable<ReceivedSuggestion | null>
  userId: number | null = null
  selectedId: number | null = null

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectId).subscribe(id => this.userId = id)
    this.suggestionForm = this.fb.group({
      title: ['', [Validators.required]],
      plot: ['', [Validators.required]],
    });
    this.store.dispatch(suggestionActions.getAllSuggestion())
    this.suggestions$ = this.store.select(selectSuggestions)
    this.selectedSuggestion$ = this.store.select(selectSuggestion)
    this.selectedSuggestion$.subscribe(suggestion => this.selectedId = suggestion ? suggestion.id : null)
  }

  selectSuggestion(suggestion: ReceivedSuggestion) {
    this.store.dispatch(suggestionActions.setSuggestion({ suggestion }))
  }

  onSubmit() {
    if (this.suggestionForm.valid) {
      const form_data = this.suggestionForm.value;
      const suggestion = {
        ...form_data,
        creator: `${API_URL}/user/${this.userId}`
      };
      this.store.dispatch(suggestionActions.sendSuggestion({ suggestion: suggestion }))
    } else {
      alert('Bad inputs. Please chech your suggestion again.')
    }
  }

  approve() {
    if (this.selectedId && this.userId) {
      this.store.dispatch(suggestionActions.addApprove({ id: this.selectedId, userId: this.userId }))
    }
  }

  isSelected(id: number): boolean {
    return this.selectedId === id;
  }

  roundToInt(value: number): number {
    return Math.round(value);
  }

  didApprove(suggestion: ReceivedSuggestion) {
    if (this.userId) {
      return suggestion.approve_users_id.includes(this.userId)
    }
    return false;
  }

}
