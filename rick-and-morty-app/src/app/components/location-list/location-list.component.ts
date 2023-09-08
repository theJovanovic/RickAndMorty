import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { selectLocations } from 'src/app/store/selectors/location.selectors'
import * as LocationActions from '../../store/actions/location.actions'
import { ActivatedRoute } from '@angular/router'
import { Location } from 'src/app/models/Location'

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  locations$!: Observable<Location[]>
  typeColorMap: { [type: string]: string } = {}

  constructor(private route: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const page = +params.get("page")!
      this.store.dispatch(LocationActions.loadLocations({ page }))
    })

    this.locations$ = this.store.select(selectLocations)
  }

  getCardColor(type: string): string {
    if (!this.typeColorMap[type]) {
      this.typeColorMap[type] = this.getRandomColor()
    }
    return this.typeColorMap[type]
  }

  getRandomColor(opacity: number = 0.5): string {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)

    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }



}
