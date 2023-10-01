import { Component } from '@angular/core'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/AuthService';
import * as UserActions from '../../store/actions/user.actions'
import { selectId, selectRole } from 'src/app/store/selectors/user.selectors';
import { UserRole } from 'src/app/models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userId: number | null = null
  isTokenAvailable$: Observable<boolean> | undefined;
  isUserAdmin: boolean = false

  constructor(private authService: AuthService, private store: Store) { }

  ngOnInit() {
    this.isTokenAvailable$ = this.authService.isTokenAvailable()
    this.store.select(selectId).subscribe(id => this.userId = id)
    this.store.select(selectRole).subscribe(role => {
      this.isUserAdmin = role === UserRole.ADMIN ? true : false
    })
  }

  logout() {
    this.store.dispatch(UserActions.logoutUser({ id: this.userId! }));
  }
}
