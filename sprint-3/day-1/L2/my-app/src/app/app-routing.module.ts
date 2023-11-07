import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user-profiles', component: UserProfileComponent,canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  {path:'login',component:LoginComponent},
  {path:'cart',component:CartComponent,canActivate:[AuthGuard]},
  {
    path: 'products',

    component: ProductsComponent,
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: ProductListComponent },
      { path: 'details/:id', component: ProductDetailsComponent },
      { path: 'create', component: ProductCreateComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
