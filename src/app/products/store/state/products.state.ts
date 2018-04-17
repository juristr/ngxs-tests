import { State, Selector, Action, StateContext } from '@ngxs/store';
import { PizzaState, PizzaStateModel } from './pizza.state';
import { LoadPizzas } from '../actions/pizzas.action';

interface ProductsStateModel {
  pizzas: PizzaStateModel;
}

@State<ProductsStateModel>({
  name: 'products',
  children: [PizzaState]
})
export class ProductsState {
  @Selector()
  static getAllPizzas(state: ProductsStateModel) {
    const entities = state.pizzas.entities;
    return Object.keys(entities).map(id => entities[+id]);
  }
}
