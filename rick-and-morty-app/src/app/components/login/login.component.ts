import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserActions from "../../store/actions/user.actions"
import { User } from 'src/app/models/User';
import { selectToken } from "../../store/selectors/user.selectors"
import { tap } from 'rxjs';
import { LoginUser } from 'src/app/models/LoginUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private store: Store) { }


  onSubmit(event: Event) {
    event.preventDefault()
    const user = new LoginUser(this.email, this.password);
    this.store.dispatch(UserActions.loginUser({ user: user }));
    this.store.select(selectToken).pipe(
      tap(token => {
        if (token != null) {
          alert(token)
        }
        else {
          alert("fail")
        }
      })
    ).subscribe()
  }
}
