import { Component, OnInit } from '@angular/core';
import {Product} from '../models/product.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  products: Product[] = [];
  searchText: string;
  location: string;
  selectedValue: string;
  productLocation: Product[] = [];
  min: number;
  max: number;
  isDeliverable: boolean;
  isProduct: boolean;
  isSelling: boolean;


  constructor(private httpClient: HttpClient) {
  }
  ngOnInit(): void {
    this.getLocation();
  }
    reset(): void {
    this.products = [];
    this.searchText = null;
    this.location = null;
    this.selectedValue = null;
    this.min = null;
    this.max = null;
    this.isDeliverable = null;
    this.isProduct = null;
    this.isSelling = null;
  }

    search(): void {
    this.httpClient.post(environment.endpointURL + 'product/searchedProducts', {
      title: this.searchText, location: this.selectedValue, minPrice: this.min, maxPrice: this.max,
      isDeliverable: this.isDeliverable, isSelling: this.isSelling, isProduct: this.isProduct
    }).subscribe((data: Product[]) => {
      console.log(data);
      this.products = data;
    });
  }
  getLocation(): void {
    this.httpClient.get(environment.endpointURL + 'product/approvedAndAvailableProducts').subscribe((data: Product[]) => {
      console.log(data);
      this.productLocation = data;
    });
  }
}
