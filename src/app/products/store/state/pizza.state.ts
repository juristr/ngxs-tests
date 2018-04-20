import { State, StateContext, Action, Selector } from '@ngxs/store';
import {
  LoadPizzas,
  LoadPizzasSuccess,
  LoadPizzasFail,
  SelectPizza,
  CreatePizza,
  CreatePizzaSuccess,
  CreatePizzaFail,
  DeletePizza,
  UpdatePizza
} from '../actions/pizzas.action';
import { PizzasService } from '../../services';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Pizza } from '../../models/pizza.model';
import { ToppingsState } from './toppings.state';
import { Router } from '@angular/router';

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
  constructor(private pizzaService: PizzasService, private router: Router) {}

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
    const selectedPizza = getState().entities[payload];

    setState({
      ...getState(),
      selectedPizza
    });
  }

  @Action(CreatePizza)
  createPizza(
    { dispatch }: StateContext<PizzaStateModel>,
    { payload }: CreatePizza
  ) {
    return this.pizzaService
      .createPizza(payload)
      .pipe(
        map(pizza => dispatch(new CreatePizzaSuccess(pizza))),
        catchError(err => dispatch(new CreatePizzaFail(err)))
      );
  }

  @Action(CreatePizzaSuccess)
  createPizzaSuccess(
    { getState, setState }: StateContext<PizzaStateModel>,
    { payload }: CreatePizzaSuccess
  ) {
    const entities = {
      ...getState().entities,
      [payload.id]: payload
    };

    setState({
      ...getState(),
      entities
    });

    this.router.navigate(['/products']);
  }

  @Action(UpdatePizza)
  updatePizza(
    { getState, setState }: StateContext<PizzaStateModel>,
    { payload }: UpdatePizza
  ) {
    return this.pizzaService.updatePizza(payload).pipe(
      tap(pizza => {
        const entities = {
          ...getState().entities,
          [payload.id]: payload
        };

        setState({
          ...getState(),
          entities
        });
      }),
      tap(() => {
        this.router.navigate(['/products']);
      })
    );
  }

  @Action(DeletePizza)
  deletePizza(
    { getState, setState }: StateContext<PizzaStateModel>,
    { payload }: DeletePizza
  ) {
    const pizza = payload;

    return this.pizzaService.removePizza(payload).pipe(
      tap(() => {
        const { [pizza.id]: removed, ...result } = getState().entities;

        setState({
          ...getState(),
          entities: result
        });
      }),
      tap(() => {
        this.router.navigate(['/products']);
      })
    );
  }
}
