import { State, Selector, Action, StateContext } from '@ngxs/store';
import { PizzaState, PizzaStateModel } from './pizza.state';
import { LoadPizzas } from '../actions/pizzas.action';
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

  @Selector(state => state.toppings)
  static getPizzaVisualized(...args) {
    console.log(...args);
  }

  // @Selector()
  // static getPizzaVisualized(state: ProductsStateModel) {
  //   // const selectedPizza = PizzaState.getSelectedPizza(state.pizzas);
  //   const selectedPizza = state.pizzas.selectedPizza;
  //   // const toppings = ToppingsState.getSelectedToppings(state.toppings).map(
  //   //   x => state.toppings.entities[x]
  //   // );
  //   const toppings = state.toppings.selectedToppings.map(
  //     id => state.toppings.entities[id]
  //   );

  //   const result = {
  //     ...selectedPizza,
  //     toppings
  //   };

  //   console.log('Visualized pizza', result);

  //   return result;
  // }
}
