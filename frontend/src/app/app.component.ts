import { Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BookmarksService } from './bookmarks/bookmarks.service';
import {Product} from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient, private bookmarksService: BookmarksService) { }

  userName = '';
  userToken: string;
  loggedIn = false;
  isAdmin: boolean;
  products: Product[] = [];

  ngOnInit(): void {
    this.checkUserStatus();
  }
  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');
    this.isAdmin = JSON.parse(localStorage.getItem('admin'));

    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
  }

  checkBookmarks(): void {
    for (let i = 0; i < this.products.length; i++) {
      this.bookmarksService.checkBookmarked(this.products[i]);
    }
  }

  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');

    this.checkUserStatus();
  }
}
