import { Action, State, StateContext, Selector } from '@ngxs/store';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Topping } from '../../models/topping.model';
import { ToppingsService } from '../../services';
import { LoadPizzas } from '../actions/pizzas.action';
import {
  LoadToppings,
  LoadToppingsFail,
  LoadToppingsSuccess,
  VisualizeToppings
} from '../actions/toppings.action';

export class ToppingsStateModel {
  entities: { [id: number]: Topping };
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

@State<ToppingsStateModel>({
  name: 'toppings',
  defaults: {
    entities: {},
    loaded: false,
    loading: true,
    selectedToppings: []
  }
})
export class ToppingsState {
  constructor(private toppingsService: ToppingsService) {}

  @Selector()
  static getAllToppingsLoaded(state: ToppingsStateModel) {
    return state.loaded;
  }

  @Selector()
  static getSelectedToppingsEntities(state: ToppingsStateModel) {
    return state.selectedToppings.map(toppingId => state.entities[toppingId]);
  }

  @Action(LoadToppings)
  loadToppings(
    { getState, setState, dispatch }: StateContext<ToppingsStateModel>,
    loadPizzas: LoadPizzas
  ) {
    setState({
      ...getState(),
      loading: true
    });

    return this.toppingsService
      .getToppings()
      .pipe(
        map(
          toppings => dispatch(new LoadToppingsSuccess(toppings)),
          catchError(err => dispatch(of(new LoadToppingsFail(err))))
        )
      );
  }

  @Action(LoadToppingsSuccess)
  loadToppingsSuccess(
    { getState, setState }: StateContext<ToppingsStateModel>,
    { payload }: LoadToppingsSuccess
  ) {
    const toppings = payload;

    const entities = toppings.reduce(
      (entities: { [id: number]: Topping }, topping: Topping) => {
        return {
          ...entities,
          [topping.id]: topping
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

  @Action(LoadToppingsFail)
  loadToppingsFail(
    { getState, setState }: StateContext<ToppingsStateModel>,
    { payload }: LoadToppingsFail
  ) {
    setState({
      ...getState(),
      loaded: false,
      loading: false
    });
  }

  @Action(VisualizeToppings)
  visualizeToppings(
    { getState, setState, patchState }: StateContext<ToppingsStateModel>,
    { payload }: VisualizeToppings
  ) {
    setState({
      ...getState(),
      selectedToppings: payload
    });

    // patchState({
    //   selectedToppings: payload
    // });
  }
}
