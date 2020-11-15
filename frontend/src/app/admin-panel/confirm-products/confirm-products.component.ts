import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-confirm-products',
  templateUrl: './confirm-products.component.html',
  styleUrls: ['./confirm-products.component.css']
})
export class ConfirmProductsComponent implements OnInit{

  products: Product[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get(environment.endpointURL + 'product/uncheckedProducts').subscribe((instances: Product[]) => {
      console.log(instances);
      this.products = instances;
    });
  }

  approve(product: Product): void {
    this.httpClient.put(environment.endpointURL + 'product/approve/' + product.productId, {
    }).subscribe();
  }

  reject(product: Product): void {
    this.httpClient.put(environment.endpointURL + 'product/reject/' + product.productId, {
      rejectionReason: product.rejectionReason
    }).subscribe();
  }
}

