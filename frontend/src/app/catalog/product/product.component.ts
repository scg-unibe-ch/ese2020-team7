import { Component, OnInit } from '@angular/core';
/*
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { environment } from '../../../environments/environment';
*/
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
// Very messy WIP
export class ProductComponent{
/*
  newProductName = '';
  products: Product[] = [];

  constructor(private httpClient: HttpClient) {}

  // Product - CREATE
  onProductCreate(): void {
    this.httpClient.post(environment.endpointURL + 'product', {
      name: this.newProductName
    }).subscribe((instance: any) => {
      this.products.push(new Product(instance.product, instance.name, []));
      this.newProductName = '';
    });
  }

  // Product - READ
  ngOnInit(): void {
    this.httpClient.get(environment.endpointURL + 'product').subscribe((instances: any) => {
      this.product = instances.map((instance: any) => {
        const todoItems = instance.todoItems.map((item: any) => new Product(item.todoItemId, item.todoListId, item.name, item.done));

        return new Product(instance.todoListId, instance.name, todoItems);
      });
    });
  }

  // Product - UPDATE
  onProductUpdate(product: Product): void {
    this.httpClient.put(environment.endpointURL + 'product/' + product.productId, {
      name: product.name,
    }).subscribe();
  }

  // Product - DELETE
  onProductDelete(product: Product): void {
    this.httpClient.delete(environment.endpointURL + 'product/' + product.productId).subscribe(() => {
      this.todoLists.splice(this.todoLists.indexOf(product), 1);
    });
  }
 */
}
