import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Product} from '../models/product.model';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  constructor(private httpClient: HttpClient,
              public dialog: MatDialog) {
  }

  // public dialog: MatDialog

  userName = '';
  userToken: string;
  loggedIn = false;
  rejectedProducts: Product[] = [];
  uncheckedProducts: Product[] = [];
  approvedProducts: Product[] = [];
  public dataForChild = 'hello Child';
  person = {name: 'lotta', age: 21};


  ngOnInit(): void {
    this.checkUserStatus();
    this.httpClient.get(environment.endpointURL + '/myRejectedProducts').subscribe((data: Product[]) => {
      console.log(data);
      this.rejectedProducts = data;
    });
    // get uncheckedProducts
    // get checkedProducts
  }

  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');

    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
  }

}
