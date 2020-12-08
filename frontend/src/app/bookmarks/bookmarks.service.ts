import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Bookmark } from '../models/bookmark.model';

@Injectable({
    providedIn: 'root'
  })

  export class BookmarksService {

    public cartCountEmitter = new EventEmitter<number>();

    public bookmarksProductArray: Bookmark[] = [];

    constructor(private http: HttpClient) {
      this.fetchBookmarksProduct();
     }

    addFinalToBookmarks(bookmark: Bookmark): boolean {
      let flagProductExist = false;
      for (let i = 0; i < this.bookmarksProductArray.length; i++) {
          if (this.bookmarksProductArray[i].product.productId === bookmark.product.productId && this.bookmarksProductArray[i].userId === bookmark.userId) {
            flagProductExist = true;
            return;
          }
      }
      if (!flagProductExist) {
        this.bookmarksProductArray.push(bookmark);
      }
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarksProductArray));
      // product.isBookmarked = true;
    }

    fetchBookmarksProduct(): any {
      this.bookmarksProductArray = JSON.parse(localStorage.getItem('bookmarks')) || [];
      return this.bookmarksProductArray;
    }

    removeBookmarksItem(bookmark: Bookmark): any {
      const index: number = this.bookmarksProductArray.indexOf(bookmark);
      if (index !== -1) {
        this.bookmarksProductArray.splice(index, 1);
        bookmark.product.isBookmarked = false;
        localStorage.setItem('bookmarks', JSON.stringify(this.bookmarksProductArray));
      }
    }

    checkBookmarked(product: Product): any {
      for (let i = 0; i < this.bookmarksProductArray.length; i++) {
        if (this.bookmarksProductArray[i].product.productId === product.productId) {
          product.isBookmarked = true;
        }
      }
    }
  }
