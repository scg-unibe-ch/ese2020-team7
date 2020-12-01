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

  userName = '';
  userToken: string;
  loggedIn = false;

  rejectedProducts: Product[] = [];
  uncheckedProducts: Product[] = [];
  approvedProducts: Product[] = [];
  soldProducts: Product[] = [];
  boughtProducts: Product[] = [];
  lentProducts: Product[] = [];
  usedServices: Product[] = [];


  ngOnInit(): void {
    this.checkUserStatus();
    this.httpClient.get(environment.endpointURL + 'product/myRejectedProducts').subscribe((data: Product[]) => {
      console.log(data);
      this.rejectedProducts = data;
    });
    this.httpClient.get(environment.endpointURL + 'product/myPendantProducts').subscribe((data: Product[]) => {
      console.log(data);
      this.uncheckedProducts = data;
    });
    this.httpClient.get(environment.endpointURL + 'product/myApprovedProducts').subscribe((data: Product[]) => {
      console.log(data);
      this.approvedProducts = data;
    });
    this.httpClient.get(environment.endpointURL + 'product/mySoldProducts').subscribe((data: Product[]) => {
      console.log(data);
      this.soldProducts = data;
    });
    this.httpClient.get(environment.endpointURL + 'product/productsIBought').subscribe((data: Product[]) => {
      console.log(data);
      this.boughtProducts = data;
    });
    // myLentProducts kommt noch
    // myUsedServices kommt noch
  }

  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');

    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
  }

  onDelete(productId): void {
    this.httpClient.delete(environment.endpointURL + 'product/delete/' + productId).subscribe();
  }

}
