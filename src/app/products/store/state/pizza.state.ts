import { State, StateContext, Action, Selector } from '@ngxs/store';
import {
  LoadPizzas,
  LoadPizzasSuccess,
  LoadPizzasFail,
  SelectPizza
} from '../actions/pizzas.action';
import { PizzasService } from '../../services';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Pizza } from '../../models/pizza.model';
import { ToppingsState } from './toppings.state';

export class PizzaStateModel {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
  selectedPizza: Pizza = {};
}

@State<PizzaStateModel>({
  name: 'pizzas',
  defaults: {
    entities: {},
    loaded: false,
    loading: true,
    selectedPizza: {}
  }
})
export class PizzaState {
  constructor(private pizzaService: PizzasService) {}

  @Selector()
  static getSelectedPizza(state: PizzaStateModel) {
    return state.selectedPizza;
  }

  @Selector()
  static allPizzasLoaded(state: PizzaStateModel) {
    return state.loaded;
  }

  @Selector()
  static getAllPizzasEntities(state: PizzaStateModel) {
    return state.entities;
  }

  @Action(LoadPizzas)
  loadPizzas(
    { getState, setState, dispatch }: StateContext<PizzaStateModel>,
    loadPizzas: LoadPizzas
  ) {
    setState({
      ...getState(),
      loading: true
    });

    return this.pizzaService
      .getPizzas()
      .pipe(
        map(pizzas => dispatch(new LoadPizzasSuccess(pizzas))),
        catchError(error => dispatch(of(new LoadPizzasFail(error))))
      );
  }

  @Action(LoadPizzasSuccess)
  loadPizzasSuccess(
    { getState, setState }: StateContext<PizzaStateModel>,
    { payload }: LoadPizzasSuccess
  ) {
    const pizzas = payload;

    const entities = pizzas.reduce(
      (entities: { [id: number]: Pizza }, pizza) => {
        return {
          ...entities,
          [pizza.id]: pizza
        };
      },
      {
        ...getState().entities
      }
    );

    setState({
      ...getState(),
      loaded: true,
      loading: false,
      entities
    });
  }

  @Action(LoadPizzasFail)
  loadPizzasFail(
    { getState, setState }: StateContext<PizzaStateModel>,
    { payload }: LoadPizzasFail
  ) {
    setState({
      ...getState(),
      loaded: false,
      loading: false
    });
  }

  @Action(SelectPizza)
  selectPizza(
    { getState, setState }: StateContext<PizzaStateModel>,
    { payload }: SelectPizza
  ) {
    console.log('selecting pizza', payload);
    const selectedPizza = getState().entities[payload];

    setState({
      ...getState(),
      selectedPizza
    });
  }
}
