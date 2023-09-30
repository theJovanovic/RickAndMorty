import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserData } from 'src/app/models/UserData';
import * as adminActions from '../../store/actions/admin.actions'
import { Observable } from 'rxjs'
import { selectUsers } from 'src/app/store/selectors/admin.selector';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users$!: Observable<UserData[]>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(adminActions.loadUsers())
    this.users$ = this.store.select(selectUsers)
  }

  updateRole(user: UserData, event: Event): void {
    const element = event.target as HTMLSelectElement;
    const role = element.value;
    user = { ...user, role: role }
    console.log(user)
    this.store.dispatch(adminActions.modifyUser({ user }))
  }


  deleteUser(userId: number): void {
    alert(`delete user ${userId}`)
  }
}