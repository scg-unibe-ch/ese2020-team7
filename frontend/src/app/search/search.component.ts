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
  products1: Product[] = [];
  location: string;
  selectedValue: string;
  productLocation: Product[] = [];

  constructor(private httpClient: HttpClient) {
  }
  ngOnInit(): void {
    this.getLocation();
  }

  search(): void {
    this.httpClient.post(environment.endpointURL + 'product/searchedProducts', {
      title: this.searchText
    }).subscribe((data: Product[]) => {
      console.log(data);
      this.products = data;
    });
  }
  filterLocation(): void {
    this.httpClient.post(environment.endpointURL + 'product/searchedProducts', {
      location: this.selectedValue
    }).subscribe((data: Product[]) => {
      console.log(data);
      this.products1 = data;
    });
  }
  getLocation(): void {
    this.httpClient.get(environment.endpointURL + 'product/approvedAndAvailableProducts').subscribe((data: Product[]) => {
      console.log(data);
      this.productLocation = data;
    });
  }
}
