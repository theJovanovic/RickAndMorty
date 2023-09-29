import { Component } from '@angular/core';
import * as CharacterActions from '../../store/actions/character.actions'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-character-filter',
  templateUrl: './character-filter.component.html',
  styleUrls: ['./character-filter.component.css']
})
export class CharacterFilterComponent {

  showFilters: boolean = false

  constructor(private store: Store) { }

  onSubmit(event: Event) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    const filter = {
      name: formData.get('name'),
      status: formData.get('status'),
      species: formData.get('species'),
      type: formData.get('type'),
      gender: formData.get('gender')
    }

    const query = this.constructQueryUrl(filter)
    this.store.dispatch(CharacterActions.loadCharacters({ query: `page=1&${query}` }))
  }


  private constructQueryUrl(filter: any): string {
    const query = Object.keys(filter)
      .filter(key => filter[key] && filter[key] !== "")
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}`)
      .join('&')

    return query
  }

}
