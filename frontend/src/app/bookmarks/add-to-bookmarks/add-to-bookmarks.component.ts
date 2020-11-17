/* import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Component({
    selector: 'app-add-to-bookmarks',
    templateUrl: './add-to-bookmarks.component.html',
  })

  export class AddToBookmarksComponent implements OnInit {

    savedProducts: Product[] = [];
    products: Product[] = [];

    constructor(private httpClient: HttpClient) {}

    ngOnInit(): void {
      this.httpClient.get(environment.endpointURL + 'product/addToBookmarks').subscribe((instances: Product[]) => {
        console.log(instances);
        this.products = instances;
      });
    }

    addToBookmarks(product: Product): void {
      //this.savedProducts.push(savedProduct);
      this.httpClient.put(environment.endpointURL + 'product/bookmarks/' + product.productId, {
      }).subscribe();
      this.savedProducts.push(product);
      window.alert('The product has been added to your bookmarks!');
    }
    
  }
  */