import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngxs/store';
import { ProductsState } from '../store/state/products.state';
import { LoadPizzas } from '../store/actions/pizzas.action';
import { Observable } from 'rxjs';
import { PizzaState } from '../store/state/pizza.state';

@Injectable()
export class PizzasGuard implements CanActivate {
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
    return this.store.select(PizzaState.allPizzasLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadPizzas());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
