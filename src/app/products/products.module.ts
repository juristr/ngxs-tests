import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';

// components
import {
  PizzaItemComponent,
  PizzaFormComponent,
  PizzaDisplayComponent,
  PizzaToppingsComponent
} from './components';

// containers
import { ProductsComponent, ProductItemComponent } from './containers';

// services
import { PizzasService, ToppingsService } from './services';
import { ProductsRoutingModule } from './products-routing.module';
import { PizzaState } from './store/state/pizza.state';
import { ProductsState } from './store/state/products.state';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProductsRoutingModule,
    NgxsModule.forFeature([ProductsState, PizzaState])
  ],
  providers: [PizzasService, ToppingsService],
  declarations: [
    ProductsComponent,
    ProductItemComponent,
    PizzaItemComponent,
    PizzaFormComponent,
    PizzaDisplayComponent,
    PizzaToppingsComponent
  ],
  exports: [ProductsComponent, ProductItemComponent, PizzaItemComponent]
})
export class ProductsModule {}
