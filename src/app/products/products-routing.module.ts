import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { ProductsComponent, ProductItemComponent } from './containers';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: ':id',
    component: ProductItemComponent
  },
  {
    path: 'new',
    component: ProductItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
