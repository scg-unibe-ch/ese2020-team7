import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Product} from '../models/product.model';
import {ProductAttributes} from '../../../../backend/src/models/product.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit{

  products: Product[] = [];

  constructor(private httpClient: HttpClient) {}

  purchase(): void {
    window.alert('The add-product has been bought! Hooray!');
  }

  ngOnInit(): void {
    this.httpClient.get(environment.endpointURL + 'product/approvedProducts').subscribe((data: Product[]) => {
      console.log(data);
      this.products = data;
    });
  }
}




