import { Component } from '@angular/core'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/AuthService';
import * as UserActions from '../../store/actions/user.actions'
import { selectId, selectRole, selectToken } from 'src/app/store/selectors/user.selectors';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/models/User';

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
  isUserAdmin: boolean = false

  constructor(private authService: AuthService, private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.isTokenAvailable$ = this.authService.isTokenAvailable();
    this.store.select(selectId).subscribe(id => this.userId = id)
    this.store.select(selectToken).subscribe(token => this.token = token)
    this.store.select(selectRole).subscribe(role => {
      this.isUserAdmin = role === UserRole.ADMIN ? true : false
    })

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
