import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectToken } from './store/selectors/user.selectors';
import * as UserActions from '../app/store/actions/user.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'rick-and-morty-app'
  logoutSubscription!: Subscription;

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {

  }
}
