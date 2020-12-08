import {Component, OnInit} from '@angular/core';
import { Product } from '../models/product.model';
import { BookmarksService } from './bookmarks.service';
import { Bookmark } from '../models/bookmark.model';

@Component({
  selector: 'app-bookmarks',
  styleUrls: ['./bookmarks.component.css'],
  templateUrl: './bookmarks.component.html',
})

export class BookmarksComponent implements OnInit {

  public localBookmarks: Bookmark[] = [];
  public myBookmarks: Product[] = [];
  userId: number;

  constructor(private bookmarkService: BookmarksService) { }

  ngOnInit(): void {
    this.localBookmarks = this.bookmarkService.fetchBookmarksProduct();
    this.getUserId();
    for (let i = 0; i < this.localBookmarks.length; i++) {
      if (this.localBookmarks[i].userId === this.userId) {
        this.myBookmarks.push(this.localBookmarks[i].product);
      }
    }
  }

  addItemToBookmarks(bookmark: Bookmark): void {
    this.bookmarkService.addFinalToBookmarks(bookmark);
    this.localBookmarks = this.bookmarkService.fetchBookmarksProduct();
  }

  deleteBookmarksItem(bookmark: Bookmark): void {
    console.log('0000>>>', bookmark);
    this.bookmarkService.removeBookmarksItem(bookmark);
    this.localBookmarks = this.bookmarkService.fetchBookmarksProduct();
  }

  getUserId(): void {
    this.userId = JSON.parse(localStorage.getItem('userId'));
  }
}
