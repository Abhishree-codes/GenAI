import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { CommentsRoutingModule } from './comments/comments-routing.module';


export const routes: Routes = [
    {path:'',component:ProductComponent},
    { path: 'login', component: LoginComponent },
    {path:'cart',component:CartComponent},
    {path:'comments',
    loadChildren:()=> CommentsRoutingModule
}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule { }
  
