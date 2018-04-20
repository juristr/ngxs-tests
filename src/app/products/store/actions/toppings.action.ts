import { Topping } from '../../models/topping.model';

export const LOAD_TOPPINGS = '[Products] Load Toppings';
export const LOAD_TOPPINGS_SUCCESS = '[Products] Load Toppings Success';
export const LOAD_TOPPINGS_FAIL = '[Products] Load Toppings Fail';
export const VISUALIZE_TOPPINGS = '[Products] Visualize toppings';

export class LoadToppings {
  static readonly type = LOAD_TOPPINGS;
}

export class LoadToppingsSuccess {
  static readonly type = LOAD_TOPPINGS_SUCCESS;

  constructor(public payload: Topping[]) {}
}

export class LoadToppingsFail {
  static readonly type = LOAD_TOPPINGS_FAIL;

  constructor(public payload: any) {}
}

export class VisualizeToppings {
  static readonly type = VISUALIZE_TOPPINGS;

  constructor(public payload: number[]) {}
}
