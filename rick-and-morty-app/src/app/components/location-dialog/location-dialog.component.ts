import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as Highcharts from 'highcharts';
import * as locationActions from '../../store/actions/location.actions'
import { selectLocationPieChart } from 'src/app/store/selectors/location.selectors';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.css']
})
export class LocationDialogComponent {
  Highcharts = Highcharts;
  location_id: number | null = null
  chart: Highcharts.Options | null = null

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private store: Store) {
    this.location_id = data
  }

  ngOnInit(): void {
    if (this.location_id) {
      this.store.dispatch(locationActions.loadLocationPieChart({ location_id: this.location_id }))
      this.store.select(selectLocationPieChart).subscribe(result => this.chart = result as Highcharts.Options | null)
    }
  }

}
