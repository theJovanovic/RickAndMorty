import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserActions from "../../store/actions/user.actions"
import { User } from 'src/app/models/User';
import { selectToken } from "../../store/selectors/user.selectors"
import { tap } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';

  constructor(private store: Store) { }

  onSubmit(event: Event) {
    event.preventDefault()
    const newUser = new User(this.firstname, this.lastname, this.email, this.password);
    this.store.dispatch(UserActions.registerUser({ user: newUser }));
    this.store.select(selectToken).pipe(
      tap(token => {
        if (token != null ) {
          alert("navigate")
        }
        else {
          alert("don't navigate")
        }
      })
    ).subscribe()
  }
}
