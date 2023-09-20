import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectNextUrl as selectNextUrlCharacter, selectPrevUrl as selectPrevUrlCharacter, selectTotalPages as selectTotalPagesCharacter } from 'src/app/store/selectors/character.selectors'
import { selectNextUrl as selectNextUrlEpisode, selectPrevUrl as selectPrevUrlEpisode, selectTotalPages as selectTotalPagesEpisode } from 'src/app/store/selectors/episode.selectors'
import { selectNextUrl as selectNextUrlLocation, selectPrevUrl as selectPrevUrlLocation, selectTotalPages as selectTotalPagesLocation } from 'src/app/store/selectors/location.selectors'
import * as CharacterActions from '../../store/actions/character.actions'

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() type: 'character' | 'location' | 'episode' | undefined
  @Input() query: string = "page=1";
  prevQuery: string | null = null
  nextQuery: string | null = null
  totalPages: number = 1

  constructor(private store: Store) { }

  ngOnInit(): void {
    switch (this.type) {
      case 'character':
        this.store.select(selectPrevUrlCharacter).subscribe(prevUrl => this.prevQuery = prevUrl)
        this.store.select(selectNextUrlCharacter).subscribe(nextUrl => this.nextQuery = nextUrl)
        this.store.select(selectTotalPagesCharacter).subscribe(totalPages => this.totalPages = totalPages)
        break;

      case 'episode':
        this.store.select(selectPrevUrlEpisode).subscribe(prevUrl => this.prevQuery = prevUrl)
        this.store.select(selectNextUrlEpisode).subscribe(nextUrl => this.nextQuery = nextUrl)
        this.store.select(selectTotalPagesEpisode).subscribe(totalPages => this.totalPages = totalPages)
        break;

      case 'location':
        this.store.select(selectPrevUrlLocation).subscribe(prevUrl => this.prevQuery = prevUrl)
        this.store.select(selectNextUrlLocation).subscribe(nextUrl => this.nextQuery = nextUrl)
        this.store.select(selectTotalPagesLocation).subscribe(totalPages => this.totalPages = totalPages)
        break;

      default:
        break;
    }

  }

  navigateBack() {
    if (this.prevQuery != null) {
      const query = this.prevQuery.split('?')[1]
      this.store.dispatch(CharacterActions.loadCharacters({ query: query }))
      window.scroll(0, 0);
    }
  }

  navigateFront() {
    if (this.nextQuery != null) {
      const query = this.nextQuery.split('?')[1]
      this.store.dispatch(CharacterActions.loadCharacters({ query: query }))
      window.scroll(0, 0);
    }
  }
}
