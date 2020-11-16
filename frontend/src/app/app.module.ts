import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserLoginComponent } from './user-login/user-login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AddProductComponent } from './catalog/add-product/add-product.component';
import {AddAdminComponent} from './admin-panel/add-admin/add-admin.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ConfirmProductsComponent } from './admin-panel/confirm-products/confirm-products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AddToShoppingCartComponent } from './shopping-cart/add-to-shopping-cart/add-to-shopping-cart.component';
import {HomeComponent} from './home/home.component';
import { ProductsComponent } from './admin-panel/confirm-products/products/products.component';
import { EditProductComponent } from './catalog/edit-product/edit-product.component';
import { ProductDetailComponent } from './catalog/product-detail/product-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    UserLoginComponent,
    RegistrationComponent,
    AdminPanelComponent,
    CatalogComponent,
    AddProductComponent,
    AddAdminComponent,
    ConfirmProductsComponent,
    ShoppingCartComponent,
    AddToShoppingCartComponent,
    HomeComponent,
    ProductsComponent,
    EditProductComponent,
    ProductDetailComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatExpansionModule,
    RouterModule.forRoot([]),
    MatRadioModule,
    MatPaginatorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
