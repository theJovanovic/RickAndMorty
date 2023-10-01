import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserActions from "../../store/actions/user.actions"
import { User } from 'src/app/models/User';
import { selectError, selectToken } from "../../store/selectors/user.selectors"
import { Subscription, filter, tap, takeUntil, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    this.store.select(selectToken).subscribe(token => {
      if (token) {
        this.router.navigate(['/character']);
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
    const newUser = new User(this.firstname, this.lastname, this.email, this.password);
    this.store.dispatch(UserActions.registerUser({ user: newUser }));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.store.dispatch(UserActions.clearError());
  }
}
