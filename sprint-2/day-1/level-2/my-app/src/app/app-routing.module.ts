import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { BrowserModule } from '@angular/platform-browser';
import { CatalogueComponent } from './catalogue/catalogue.component';
const routes: Routes = [
  {path:'',component:CatalogueComponent},
  { path: 'cart', component: CartComponent },
];


@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
