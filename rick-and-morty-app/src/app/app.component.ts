import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectToken } from './store/selectors/user.selectors';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rick-and-morty-app'
  token: string | null = null
  logoutSubscription!: Subscription;

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    this.store.select(selectToken).subscribe(token => this.token = token)
    this.logoutSubscription = this.store.select(selectToken).subscribe(token => {
      if (!token) {
        this.router.navigate(['/login']);
      }
    });
  }
}
