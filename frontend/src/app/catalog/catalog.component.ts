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
export class CatalogComponent implements OnInit{

  products: Product[] = [];
  savedProducts: Product[] = [];
  userNameOrMail = '';
  userToken: string;
  loggedIn = false;
  isAdmin: boolean;
  userId: number;

  constructor(private httpClient: HttpClient, public bookmarksService: BookmarksService) {}

  purchase(): void {
    window.alert('The add-product has been bought! Hooray!');
  }

  addToBookmarks(product: Product): void {
    console.log('product', product);
    this.bookmarksService.addFinalToBookmarks(product);
    this.bookmarksService.fetchBookmarksProduct();
    window.alert('The product has been added to your bookmarks!');
  }

  ngOnInit(): void {
    this.checkUserStatus();
    this.httpClient.get(environment.endpointURL + 'product/approvedProducts').subscribe((data: Product[]) => {
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
}
