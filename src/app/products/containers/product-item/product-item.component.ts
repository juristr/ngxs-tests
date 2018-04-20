import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap, withLatestFrom, take, map } from 'rxjs/operators';
import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import {
  SelectPizza,
  CreatePizza,
  UpdatePizza,
  DeletePizza
} from '../../store/actions/pizzas.action';
import { ProductsState } from '../../store/state/products.state';
import { PizzaState } from '../../store/state/pizza.state';
import {
  VisualizeToppings,
  LoadToppings
} from '../../store/actions/toppings.action';
import { ToppingsState } from '../../store/state/toppings.state';

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="visualise$ | async">
        </pizza-display>
      </pizza-form>
    </div>
  `
})
export class ProductItemComponent implements OnInit {
  @Select(PizzaState.getSelectedPizza) pizza$: Observable<Pizza>;
  @Select(ProductsState.getPizzaVisualized) visualise$: Observable<Pizza>;
  // @Select(ToppingsState.getAllToppings) toppings$: Observable<Topping[]>; // doesn't work
  toppings$: Observable<Topping[]>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
      .pipe(
        tap(params => {
          this.store
            .dispatch(new SelectPizza(+params['id']))
            .pipe(withLatestFrom(this.pizza$))
            .subscribe(values => {
              const pizza = values[1];
              const pizzaExists = !!(pizza && pizza.toppings);
              const toppings = pizzaExists
                ? pizza.toppings.map(topping => topping.id)
                : [];

              this.store.dispatch(new VisualizeToppings(toppings));
            });
        })
      )
      .subscribe();

    this.toppings$ = this.store
      .select(state => state.products.toppings.entities)
      .pipe(map(entities => Object.keys(entities).map(id => entities[+id])));
  }

  onSelect(event: number[]) {
    console.log('click handler select toppings', event);
    this.store.dispatch(new VisualizeToppings(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    this.store.dispatch(new DeletePizza(event));
  }
}
