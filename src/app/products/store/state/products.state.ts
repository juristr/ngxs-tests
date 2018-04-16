import { State, Selector } from '@ngxs/store';
import { PizzaState } from './pizza.state';

@State({
  name: 'products',
  children: [PizzaState]
})
export class ProductsState {
  @Selector()
  static pizzas(state) {
    return state.pizzas.data;
  }
}
