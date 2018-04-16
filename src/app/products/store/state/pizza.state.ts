import { State } from '@ngxs/store';

@State({
  name: 'pizzas',
  defaults: {
    data: [
      {
        name: 'Seaside Surfin',
        toppings: [
          {
            id: 6,
            name: 'mushroom'
          },
          {
            id: 7,
            name: 'olive'
          },
          {
            id: 2,
            name: 'bacon'
          },
          {
            id: 3,
            name: 'basil'
          },
          {
            id: 1,
            name: 'anchovy'
          },
          {
            id: 8,
            name: 'onion'
          },
          {
            id: 11,
            name: 'sweetcorn'
          },
          {
            id: 9,
            name: 'pepper'
          },
          {
            id: 5,
            name: 'mozzarella'
          }
        ],
        id: 2
      }
    ],
    loaded: false,
    loading: true
  }
})
export class PizzaState {}