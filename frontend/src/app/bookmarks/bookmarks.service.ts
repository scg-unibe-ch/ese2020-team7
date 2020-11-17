import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
  })

  export class BookmarksService {

    public cartCountEmitter = new EventEmitter<number>();
  
    public bookmarksProductArray: Product[] = []
  
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
      
      localStorage.setItem("cart",JSON.stringify(this.bookmarksProductArray))
  
    }
    /*
    RemoveFromFinalCart(product:Product) {
       for(let i=0; i<this.bookmarksProductArray.length;i++){
          if(this.bookmarksProductArray[i].productId == product.productId){
              this.bookmarksProductArray.splice(i);
              console.log("splice",this.bookmarksProductArray);
          }
      }
      
      localStorage.setItem("bookmarks",JSON.stringify(this.bookmarksProductArray))
  
    }
    */
  
    fetchBookmarksProduct(){
      this.bookmarksProductArray = JSON.parse(localStorage.getItem("bookmarks")) || []
      this.cartCountEmitter.emit(this.bookmarksProductArray && this.bookmarksProductArray.length?  this.bookmarksProductArray.length:0)
      return this.bookmarksProductArray
    }
  
    removeBookmarksItem(product){
      const index: number = this.bookmarksProductArray.indexOf(product);
      if (index !== -1) {
        this.bookmarksProductArray.splice(index, 1);
      localStorage.setItem("cart",JSON.stringify(this.bookmarksProductArray))
  
    }    
    }
  
  }
  