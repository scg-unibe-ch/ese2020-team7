import {Component, OnInit} from '@angular/core';
import { Product } from '../models/product.model';
import { BookmarksService } from './bookmarks.service';

@Component({
  selector: 'app-bookmarks',
  styleUrls: ['./bookmarks.component.css'],
  templateUrl: './bookmarks.component.html',
})

export class BookmarksComponent implements OnInit {

  public localBookmarks: Product[] = [];

  constructor(private bookmarkService: BookmarksService) { }

  ngOnInit(): void {
    this.localBookmarks = this.bookmarkService.fetchBookmarksProduct();
  }

  addItemToBookmarks(product: Product): void {
    this.bookmarkService.addFinalToBookmarks(product);
    this.localBookmarks = this.bookmarkService.fetchBookmarksProduct();
  }

  deleteBookmarksItem(product: Product): void {
    console.log('0000>>>', product);
    this.bookmarkService.removeBookmarksItem(product);
    this.localBookmarks = this.bookmarkService.fetchBookmarksProduct();
  }
}
