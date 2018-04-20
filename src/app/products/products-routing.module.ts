import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { ProductsComponent, ProductItemComponent } from './containers';
import { PizzasGuard } from './guards/pizzas.guard';
import { ToppingsGuard } from './guards/toppings.guard';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: ProductsComponent,
    canActivate: [PizzasGuard]
  },
  {
    path: ':id',
    component: ProductItemComponent,
    canActivate: [PizzasGuard, ToppingsGuard]
  },
  {
    path: 'new',
    component: ProductItemComponent,
    canActivate: [PizzasGuard, ToppingsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
