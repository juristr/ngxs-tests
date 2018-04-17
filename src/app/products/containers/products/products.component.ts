import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store, Select } from '@ngxs/store';

import { Pizza } from '../../models/pizza.model';
import { PizzasService } from '../../services/pizzas.service';
import { Observable } from 'rxjs';
import { PizzaState } from '../../store/state/pizza.state';
import { ProductsState } from '../../store/state/products.state';

@Component({
  selector: 'products',
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a
          class="btn btn__ok"
          routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <div *ngIf="!((pizzas$ | async)?.length)">
          No pizzas, add one to get started.
        </div>
        <pizza-item
          *ngFor="let pizza of (pizzas$ | async)"
          [pizza]="pizza">
        </pizza-item>
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  @Select(ProductsState.getAllPizzas) pizzas$: Observable<Pizza[]>;

  constructor(private store: Store) {}

  ngOnInit() {}
}
