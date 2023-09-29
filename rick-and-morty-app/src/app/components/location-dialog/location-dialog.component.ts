import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as Highcharts from 'highcharts';
import * as locationActions from '../../store/actions/location.actions'
import { selectLocationPieChartEpisodes, selectLocationPieChartSpecies } from 'src/app/store/selectors/location.selectors';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.css']
})
export class LocationDialogComponent {
  Highcharts = Highcharts;
  location_id: number | null = null
  speciesChart: Highcharts.Options | null = null
  episodesChart: Highcharts.Options | null = null

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private store: Store) {
    this.location_id = data
  }

  ngOnInit(): void {
    if (this.location_id) {
      this.store.dispatch(locationActions.loadLocationPieCharts({ location_id: this.location_id }))
      this.store.select(selectLocationPieChartSpecies).subscribe(result => this.speciesChart = result as Highcharts.Options | null)
      this.store.select(selectLocationPieChartEpisodes).subscribe(result => this.episodesChart = result as Highcharts.Options | null)
    }
  }

}
