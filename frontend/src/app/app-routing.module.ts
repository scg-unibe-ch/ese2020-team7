import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {UserLoginComponent} from './user-login/user-login.component';
import {RegistrationComponent} from './registration/registration.component';
import {HomeComponent} from './home/home.component';
import {CatalogComponent} from './catalog/catalog.component';
import {AddProductComponent} from './catalog/add-product/add-product.component';
import {EditProductComponent} from './catalog/edit-product/edit-product.component';
import {ProductDetailComponent} from './catalog/product-detail/product-detail.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'catalog', component: CatalogComponent},
  { path: 'add-offer', component: AddProductComponent},
  { path: 'edit/:id', component: EditProductComponent },
  { path: 'product/:id', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// link: <a routerLink="/login">bla</a>
