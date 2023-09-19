import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserActions from "../../store/actions/user.actions"
import { LoginUser } from 'src/app/models/LoginUser';
import { selectToken } from 'src/app/store/selectors/user.selectors';
import { tap } from 'rxjs'
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
  loginSubscription!: Subscription;

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.loginSubscription = this.store.select(selectToken).subscribe(token => {
      if (token) {
        this.router.navigate(['/character']);
      }
    });
  }

  onSubmit(event: Event) {
    event.preventDefault()
    const user = new LoginUser(this.email, this.password);
    this.store.dispatch(UserActions.loginUser({ user: user }));
  }
}
