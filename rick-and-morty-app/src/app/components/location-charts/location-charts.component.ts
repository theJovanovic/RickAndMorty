import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Highcharts from 'highcharts';
import * as locationActions from '../../store/actions/location.actions'
import { selectCharactersPerLocationOptions, selectEpisodePerLocationOptions, selectLocationTypeOptions } from 'src/app/store/selectors/location.selectors';

@Component({
  selector: 'app-location-charts',
  templateUrl: './location-charts.component.html',
  styleUrls: ['./location-charts.component.css']
})
export class LocationChartsComponent implements OnInit {
  Highcharts = Highcharts;
  episodePerLocationOptions: Highcharts.Options | null = null
  charactersPerLocationOptions: Highcharts.Options | null = null
  locationTypeOptions: Highcharts.Options | null = null

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(locationActions.loadCharts())
    this.store.select(selectEpisodePerLocationOptions).subscribe(chart => this.episodePerLocationOptions = chart as Highcharts.Options | null)
    this.store.select(selectCharactersPerLocationOptions).subscribe(chart => this.charactersPerLocationOptions = chart as Highcharts.Options | null)
    this.store.select(selectLocationTypeOptions).subscribe(chart => this.locationTypeOptions = chart as Highcharts.Options | null)
  }
}
