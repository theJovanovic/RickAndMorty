import { Component } from '@angular/core'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/AuthService';
import * as UserActions from '../../store/actions/user.actions'
import { selectId, selectToken } from 'src/app/store/selectors/user.selectors';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isTokenAvailable$: Observable<boolean> | undefined;
  userId: number | null = null
  token: string | null = null
  logoutSubscription!: Subscription;

  constructor(private authService: AuthService, private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.isTokenAvailable$ = this.authService.isTokenAvailable();
    this.store.select(selectId).subscribe(id => this.userId = id)
    this.store.select(selectToken).subscribe(token => this.token = token)

    this.logoutSubscription = this.store.select(selectToken).subscribe(token => {
      // if (!token) {
      //   this.router.navigate(['/login']);
      // }
    });
  }

  logout() {
    this.store.dispatch(UserActions.logoutUser({ id: this.userId! }));
  }
}
