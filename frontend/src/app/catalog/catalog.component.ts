import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Product} from '../models/product.model';
import { BookmarksService } from '../bookmarks/bookmarks.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {

  products: Product[] = [];
  savedProducts: string[];
  allProducts: string;
  allProductsArray: string[];
  userNameOrMail = '';
  userToken: string;
  loggedIn = false;
  isAdmin: boolean;
  userId: number;
  name: string;
  public localBookmarks: Product[] = [];
  page: number = 0;
  size: number = 5;
  totalProducts: number = this.products.length;
  recordCount: number;
  pageEvent: PageEvent;

  constructor(private httpClient: HttpClient,
              public bookmarksService: BookmarksService) {}

  purchase(): void {
    window.alert('The add-product has been bought! Hooray!');
  }

  addToBookmarks(product: Product): void {
    console.log('product', product);
    this.bookmarksService.addFinalToBookmarks(product);
    this.bookmarksService.fetchBookmarksProduct();
    localStorage.setItem('productBookmarked', 'true');
    product.isBookmarked = !!(localStorage.getItem('productBookmarked'));
  }

  ngOnInit(): void {
    this.checkUserStatus();
    this.httpClient.get(environment.endpointURL + 'product/approvedAndAvailableProducts').subscribe((data: Product[]) => {
      data.sort((f, n): number => {
        if (f.createdAt > n.createdAt){ return -1; }
        if (f.createdAt < n.createdAt){ return 1; }
        return 0;
      });
      console.log(data);
      this.products = data;
    });
    this.localBookmarks = this.bookmarksService.fetchBookmarksProduct();
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

  checkBookmarked(product: Product): boolean {
    for (let i = 0; i < this.localBookmarks.length; i++) {
      if (this.localBookmarks[i].productId === product.productId) {
        return true;
      }
    }
    return false;
  }

  checkBookmarks(): void {
    for (let i = 0; i < this.products.length; i++) {
      this.bookmarksService.checkBookmarked(this.products[i]);
    }
  }
}
