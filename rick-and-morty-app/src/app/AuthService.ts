import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { selectToken } from './store/selectors/user.selectors';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    token$: Observable<string | null>;

    constructor(private store: Store) {
        this.token$ = this.store.select(selectToken);
    }

    isTokenAvailable(): Observable<boolean> {
        return this.token$.pipe(
            map(token => token !== null)
        );
    }
}