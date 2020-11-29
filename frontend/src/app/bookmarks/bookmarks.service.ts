import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
  })

  export class BookmarksService {

    public cartCountEmitter = new EventEmitter<number>();
  
    public bookmarksProductArray: Product[] = [];
  
    constructor(private http:HttpClient) {
      this.fetchBookmarksProduct(); 
     }
  
    addFinalToBookmarks(product:Product) {
      let flagProductExist = false;
      for(let i=0; i<this.bookmarksProductArray.length;i++) {
          if(this.bookmarksProductArray[i].productId == product.productId) {
            flagProductExist = true;
            return;
          }
      }
      if(!flagProductExist) {
        this.bookmarksProductArray.push(product);
      }
      localStorage.setItem("bookmarks",JSON.stringify(this.bookmarksProductArray));
    }
    
    fetchBookmarksProduct() {
      this.bookmarksProductArray = JSON.parse(localStorage.getItem("bookmarks")) || [];
      return this.bookmarksProductArray;
    }
  
    removeBookmarksItem(product: Product) {
      const index: number = this.bookmarksProductArray.indexOf(product);
      if (index !== -1) {
        this.bookmarksProductArray.splice(index, 1);
      localStorage.setItem("bookmarks",JSON.stringify(this.bookmarksProductArray));
      }    
    }

  }