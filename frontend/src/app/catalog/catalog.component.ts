import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Product} from '../models/product.model';
import { BookmarksService } from '../bookmarks/bookmarks.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {

  products: Product[] = [];
  savedProducts: String[];
  allProducts: string;
  allProductsArray: String[];
  userNameOrMail = '';
  userToken: string;
  loggedIn = false;
  isAdmin: boolean;
  userId: number;
  name: string;

  constructor(private httpClient: HttpClient, public bookmarksService: BookmarksService) {}

  purchase(): void {
    window.alert('The add-product has been bought! Hooray!');
  }

  addToBookmarks(product: Product): void {
    console.log('product', product);
    this.bookmarksService.addFinalToBookmarks(product);
    this.bookmarksService.fetchBookmarksProduct();
    localStorage.setItem("productBookmarked", "true");
    product.isBookmarked = !!(localStorage.getItem("productBookmarked"));
  }

  ngOnInit(): void {
    this.checkUserStatus();
    this.httpClient.get(environment.endpointURL + 'product/approvedAndAvailableProducts').subscribe((data: Product[]) => {
      console.log(data);
      this.products = data;
    });
  }

  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userNameOrMail = localStorage.getItem('userName');
    this.isAdmin = JSON.parse(localStorage.getItem('admin'));
    this.userId = JSON.parse(localStorage.getItem('userId'));
    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
  }

  checkBookmarks(): void {
    for (let i = 0; i < this.products.length; i++) {
      this.bookmarksService.checkBookmarked(this.products[i]);
    }
  /*this.allProducts = JSON.stringify(this.products);
  this.savedProducts = localStorage.getItem("bookmarks").split(',');
  this.allProductsArray = this.allProducts.split(',');
  for (let i = 0; i < this.allProductsArray.length; i++) {
    for (let j = 0; j < this.savedProducts.length; j++) {
      if (this.allProductsArray[i] = this.savedProducts[j]) {
        this.products[i].isBookmarked = true;
      }
    }*/
  }
}