import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Product} from '../models/product.model';


@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  userName = '';
  userToken: string;
  loggedIn = false;
  products: Product[] = [];

  ngOnInit(): void {
    this.checkUserStatus();
    this.httpClient.get(environment.endpointURL + '/myProducts').subscribe((data: Product[]) => {
      console.log(data);
      this.products = data;
    });
  }
  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');

    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
  }

}
