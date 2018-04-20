import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, filter, switchMap, tap, take } from 'rxjs/operators';
import { LoadToppings } from '../store/actions/toppings.action';
import { ToppingsState } from '../store/state/toppings.state';

@Injectable()
export class ToppingsGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(err => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(ToppingsState.getAllToppingsLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadToppings());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
