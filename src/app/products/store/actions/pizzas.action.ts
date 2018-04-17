import { Pizza } from '../../models/pizza.model';

export const LOAD_PIZZAS = '[Products] Load Pizzas';
export const LOAD_PIZZAS_FAIL = '[Products] Load Pizzas Fail';
export const LOAD_PIZZAS_SUCCESS = '[Products] Load Pizzas Success';

export class LoadPizzas {
  static readonly type = LOAD_PIZZAS;
}

export class LoadPizzasFail {
  static readonly type = LOAD_PIZZAS_FAIL;
  constructor(public payload: any) {}
}

export class LoadPizzasSuccess {
  static readonly type = LOAD_PIZZAS_SUCCESS;
  constructor(public payload: Pizza[]) {}
}

export type PizzasAction = LoadPizzas | LoadPizzasFail | LoadPizzasSuccess;
