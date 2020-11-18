import { Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  userName = '';
  userToken: string;
  loggedIn = false;
  isAdmin: boolean;

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

  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');

    this.checkUserStatus();
  }
}
