import { Pizza } from '../../models/pizza.model';

export class LoadPizzas {
  static readonly type = '[Products] Load Pizzas';
}

export class LoadPizzasFail {
  static readonly type = '[Products] Load Pizzas Fail';
  constructor(public payload: any) {}
}

export class LoadPizzasSuccess {
  static readonly type = '[Products] Load Pizzas Success';
  constructor(public payload: Pizza[]) {}
}

export class SelectPizza {
  static readonly type = '[Products] Select Pizza';

  constructor(public payload: number) {}
}

export class CreatePizza {
  static readonly type = '[Products] Create Pizza';

  constructor(public payload: Pizza) {}
}

export class CreatePizzaSuccess {
  static readonly type = '[Products] Create Pizza Success';

  constructor(public payload: Pizza) {}
}

export class CreatePizzaFail {
  static readonly type = '[Products] Create Pizza Fail';

  constructor(public payload: any) {}
}

export class UpdatePizza {
  static readonly type = '[Products] Update Pizza';

  constructor(public payload: Pizza) {}
}

export class UpdatePizzaSuccess {
  static readonly type = '[Products] Update Pizza Success';

  constructor(public payload: Pizza) {}
}

export class UpdatePizzaFail {
  static readonly type = '[Products] Update Pizza Fail';

  constructor(public payload: any) {}
}

export class DeletePizza {
  static readonly type = '[Products] Delete Pizza';

  constructor(public payload: Pizza) {}
}

export class DeletePizzaSuccess {
  static readonly type = '[Products] Delete Pizza Success';

  constructor(public payload: Pizza) {}
}

export class DeletePizzaFail {
  static readonly type = '[Products] Delete Pizza Fail';

  constructor(public payload: any) {}
}
