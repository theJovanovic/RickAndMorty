import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectNextUrl, selectPrevUrl, selectTotalPages } from 'src/app/store/selectors/character.selectors'

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() type: 'characters' | 'locations' | 'episodes' | undefined
  @Input() query: string = "page=1";
  prevQuery: string | null = null
  nextQuery: string | null = null
  totalPages: number = 1

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectPrevUrl).subscribe(prevUrl => this.prevQuery = prevUrl)
    this.store.select(selectNextUrl).subscribe(nextUrl => this.nextQuery = nextUrl)
    this.store.select(selectTotalPages).subscribe(totalPages => this.totalPages = totalPages)
  }

  navigateBack() {
    if (this.prevQuery != null) {
      const query = this.prevQuery.split('?')[1]
      window.location.href = `/${this.type}/?${query}`
    }
  }

  navigateFront() {
    if (this.nextQuery != null) {
      const query = this.nextQuery.split('?')[1]
      window.location.href = `/${this.type}/?${query}`
    }
  }
}
