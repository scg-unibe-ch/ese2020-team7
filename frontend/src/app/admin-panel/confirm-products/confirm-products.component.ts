import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ProductAttributes} from '../../../../../backend/src/models/product.model';


@Component({
  selector: 'app-confirm-products',
  templateUrl: './confirm-products.component.html',
  styleUrls: ['./confirm-products.component.css']
})
export class ConfirmProductsComponent implements OnInit{

  addedProducts: string[] = ['Phone', 'Tomato', 'Rock'];
  products: Product[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get(environment.endpointURL + 'product/uncheckedProducts').subscribe((instances: Product[]) => {
      console.log(instances);
      this.products = instances;
    });
  }

  approve(product: Product): void {
    this.httpClient.put(environment.endpointURL + 'product/approve/:' + product.productId, {
      isApproved: true,
    }).subscribe();
  }

  reject(product: Product): void {
    this.httpClient.put(environment.endpointURL + 'product/reject/:' + product.productId, {
      isApproved: false,
      rejectionReason: product.rejectionReason
    }).subscribe();
  }


}
/*
ngOnInit(): void {
  this.httpClient.get(environment.endpointURL + 'product/uncheckedProducts').subscribe((instances: Product[]) => {
    this.products = instances.map((instance: ProductAttributes) => {
      return new Product(instance.productId,
        instance.isApproved,
        instance.title,
        instance.type,
        instance.price,
        instance.description,
        instance.location,
        instance.isSelling,
        instance.isAvailable,
        instance.isDeliverable,
        instance.rejectionReason,
        instance.image,
        instance.review,
        instance.userId
      );
    });
  });
}
*/
