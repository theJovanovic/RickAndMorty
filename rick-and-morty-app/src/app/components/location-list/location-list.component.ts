import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { selectLocations } from 'src/app/store/selectors/location.selectors'
import * as LocationActions from '../../store/actions/location.actions'
import * as AdminActions from '../../store/actions/admin.actions'
import { Location } from 'src/app/models/Location'
import { MatDialog } from '@angular/material/dialog'
import { LocationDialogComponent } from '../location-dialog/location-dialog.component'
import { selectRole } from 'src/app/store/selectors/user.selectors'

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  locations$!: Observable<Location[]>
  typeColorMap: { [type: string]: string } = {}
  isUserAdmin: boolean = false

  constructor(private store: Store, private dialog: MatDialog) { }

  ngOnInit(): void {
    const queryString = window.location.search.substring(1)
    this.store.dispatch(LocationActions.loadLocations({ query: queryString }))
    this.locations$ = this.store.select(selectLocations)
    this.store.select(selectRole).subscribe(role => {
      this.isUserAdmin = role === "admin" ? true : false
    })
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

  onLocationClick(location_id: number): void {
    this.dialog.open(LocationDialogComponent, { data: location_id })
  }

  deleteLocation(locationId: number) {
    this.store.dispatch(AdminActions.deleteLocation({ locationId: locationId }))
  }

}
