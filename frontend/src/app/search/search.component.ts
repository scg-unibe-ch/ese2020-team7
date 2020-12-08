import { Component, OnInit } from '@angular/core';
import {Product} from '../models/product.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { BookmarksService } from '../bookmarks/bookmarks.service';




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
  min: number = null;
  max: number = null;
  isDeliverable: boolean;
  isProduct: boolean;
  isSelling: boolean;
  sortBy = 0; // 0: newest; 1: oldest; 2: price low; 3: price high
  userNameOrMail = '';
  userToken: string;
  loggedIn = false;
  isAdmin: boolean;
  userId: number;
  public localBookmarks: Product[] = [];
  locations: string[];



  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              public bookmarksService: BookmarksService) {
  }

  ngOnInit(): void {
    this.checkUserStatus();
    this.route.queryParams.subscribe(
      params => {
        this.searchText = params.key;
      });
    this.getLocation();
    this.search();
    this.localBookmarks = this.bookmarksService.fetchBookmarksProduct();

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
    this.sortBy = 0;
    }

    search(): void {
    this.httpClient.post(environment.endpointURL + 'product/searchedProducts', {
      title: this.searchText, location: this.selectedValue, minPrice: this.min, maxPrice: this.max,
      isDeliverable: this.isDeliverable, isSelling: this.isSelling, isProduct: this.isProduct
    }).subscribe((data: Product[]) => {
      if (this.sortBy === 0) {
        data.sort((f, n): number => {
          if (f.createdAt > n.createdAt) {
            return -1;
          }
          if (f.createdAt < n.createdAt) {
            return 1;
          }
          return 0;
        });
      }
      if (this.sortBy === 1) {
        data.sort((f, n): number => {
          if (f.createdAt < n.createdAt) {
            return -1;
          }
          if (f.createdAt > n.createdAt) {
            return 1;
          }
          return 0;
        });
      }
      if (this.sortBy === 2) {
        data.sort((f, n): number => {
          if (f.price < n.price) {
            return -1;
          }
          if (f.price > n.price) {
            return 1;
          }
          return 0;
        });
      }
      if (this.sortBy === 3) {
        data.sort((f, n): number => {
          if (f.price > n.price) {
            return -1;
          }
          if (f.price < n.price) {
            return 1;
          }
          return 0;
        });
      }
      console.log(data);
      this.products = data;
    });
  }
  getLocation(): void {
    this.httpClient.get(environment.endpointURL + 'product/approvedAndAvailableProducts').subscribe((data: Product[]) => {
      const result = data.map(a => a.location);
      console.log(result);
      const mySet = new Set(result);
      this.locations = [...mySet];
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

  checkBookmarked(product: Product): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.localBookmarks.length; i++) {
      if (this.localBookmarks[i].productId === product.productId) {
        return true;
      }
    }
    return false;
  }

  checkBookmarks(): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.products.length; i++) {
      this.bookmarksService.checkBookmarked(this.products[i]);
    }
  }

  addToBookmarks(product: Product): void {
    console.log('product', product);
    this.bookmarksService.addFinalToBookmarks(product);
    this.bookmarksService.fetchBookmarksProduct();
    localStorage.setItem('productBookmarked', 'true');
    product.isBookmarked = !!(localStorage.getItem('productBookmarked'));
  }
}
