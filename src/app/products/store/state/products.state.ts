import { State, Selector, Action, StateContext } from '@ngxs/store';
import { PizzaState, PizzaStateModel } from './pizza.state';
import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import { ToppingsStateModel, ToppingsState } from './toppings.state';
import { of } from 'rxjs/observable/of';

interface ProductsStateModel {
  pizzas: PizzaStateModel;
  toppings: ToppingsStateModel;
}

@State<ProductsStateModel>({
  name: 'products',
  children: [PizzaState, ToppingsState]
})
export class ProductsState {
  @Selector()
  static getAllPizzas(state: ProductsStateModel) {
    const entities = state.pizzas.entities;
    return Object.keys(entities).map(id => entities[+id]);
  }

  @Selector()
  static getAllToppings(state: ProductsStateModel) {
    const entities = state.toppings.entities;
    return Object.keys(entities).map(id => entities[+id]);
  }

  @Selector([PizzaState.getSelectedPizza, ToppingsState.getSelectedToppingsEntities])
  static getPizzaVisualized(state: ProductsStateModel, selectedPizzaState: Pizza, selectedToppingsState: Topping[]) {
    const selectedPizza = selectedPizzaState;
    const toppings = selectedToppingsState;

    const result = {
      ...selectedPizza,
      toppings
    };

    return result;
  }
}
