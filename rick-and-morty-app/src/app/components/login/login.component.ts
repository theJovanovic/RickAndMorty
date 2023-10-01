import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserActions from "../../store/actions/user.actions"
import { LoginUser } from 'src/app/models/LoginUser';
import { selectError, selectToken } from 'src/app/store/selectors/user.selectors';
import { Subject, filter, takeUntil, tap } from 'rxjs'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    this.store.select(selectToken).subscribe(token => {
      if (token) {
        this.router.navigate(['/character'])
      }
    });
    this.store.select(selectError)
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(error => !!error),
        tap(response => alert(response.error.message))
      )
      .subscribe();
  }

  onSubmit(event: Event) {
    event.preventDefault()
    const user = new LoginUser(this.email, this.password)
    this.store.dispatch(UserActions.loginUser({ user: user }))
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.store.dispatch(UserActions.clearError());
  }
}
