import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path:'',component:ProductComponent},
    { path: 'login', component: LoginComponent },
    {path:'cart',component:CartComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule { }
  
