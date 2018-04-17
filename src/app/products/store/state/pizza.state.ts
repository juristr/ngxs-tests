import { State, StateContext, Action } from '@ngxs/store';
import {
  LoadPizzas,
  LoadPizzasSuccess,
  LoadPizzasFail
} from '../actions/pizzas.action';
import { PizzasService } from '../../services';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Pizza } from '../../models/pizza.model';

export interface PizzaStateModel {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

@State<PizzaStateModel>({
  name: 'pizzas',
  defaults: {
    entities: {},
    loaded: false,
    loading: true
  }
})
export class PizzaState {
  constructor(private pizzaService: PizzasService) {}

  @Action(LoadPizzas)
  loadPizzas(
    { getState, setState, dispatch }: StateContext<PizzaStateModel>,
    loadPizzas: LoadPizzas
  ) {
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
      entities
    });
  }
}
