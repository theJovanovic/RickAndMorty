import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserActions from "../../store/actions/user.actions"
import { User } from 'src/app/models/User';
import { selectToken } from "../../store/selectors/user.selectors"
import { tap } from 'rxjs';
import { Subscription } from 'rxjs';
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
  registerSubscription!: Subscription;

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.registerSubscription = this.store.select(selectToken).subscribe(token => {
      if (token) {
        this.router.navigate(['/character']);
      }
    });
  }

  onSubmit(event: Event) {
    event.preventDefault()
    const newUser = new User(this.firstname, this.lastname, this.email, this.password);
    this.store.dispatch(UserActions.registerUser({ user: newUser }));
  }
}
