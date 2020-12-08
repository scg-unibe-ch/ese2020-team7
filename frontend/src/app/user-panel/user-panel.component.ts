import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Product} from '../models/product.model';
import { MatDialog } from '@angular/material/dialog';
import {DeleteProductDialogComponent} from './delete-product-dialog/delete-product-dialog.component';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  constructor(private httpClient: HttpClient,
              public dialog: MatDialog) {}

  userName = '';
  userToken: string;
  loggedIn = false;
  id: null;

  rejectedProducts: Product[] = [];
  uncheckedProducts: Product[] = [];
  approvedProducts: Product[] = [];
  soldProducts: Product[] = [];
  boughtProducts: Product[] = [];
  lentProducts: Product[] = [];
  usedServices: Product[] = [];
  productsImRenting: Product[] = [];
  productsImLending: Product[] = [];

  ngOnInit(): void {
    this.checkUserStatus();
    this.httpClient.get(environment.endpointURL + 'product/myRejectedProducts').subscribe((data: Product[]) => {
      console.log(data);
      this.rejectedProducts = data;
    });
    this.httpClient.get(environment.endpointURL + 'product/myPendingProducts').subscribe((data: Product[]) => {
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
    this.httpClient.get(environment.endpointURL + 'product/productsImRenting').subscribe((data: Product[]) => {
      data.sort((f, n): number => {
        if (f.rentedUntil < n.rentedUntil){ return -1; }
        if (f.rentedUntil > n.rentedUntil){ return 1; }
        return 0;
      });
      console.log(data);
      this.productsImRenting = data;
    });
    this.httpClient.get(environment.endpointURL + 'product/productsIRented').subscribe((data: Product[]) => {
      console.log(data);
      this.lentProducts = data;
    });
    this.httpClient.get(environment.endpointURL + 'product/servicesImUtilizing').subscribe((data: Product[]) => {
      console.log(data);
      this.usedServices = data;
    });
    this.httpClient.get(environment.endpointURL + 'product/productsImLending').subscribe((data: Product[]) => {
      data.sort((f, n): number => {
        if (f.rentedUntil < n.rentedUntil){ return -1; }
        if (f.rentedUntil > n.rentedUntil){ return 1; }
        return 0;
      });
      console.log(data);
      this.productsImLending = data;
    });
  }

  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');

    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
  }

  openDialog(productId): any {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res) {
        this.onDelete(productId);
      }
    });
  }

  openSoldDialog(productId): any {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res) {
        this.onDeleteAfterSold(productId);
      }
    });
  }

  onDelete(productId): void {
    this.httpClient.delete(environment.endpointURL + 'product/delete/' + productId).subscribe();
  }

  onDeleteAfterSold(productId): void {
    this.httpClient.put(environment.endpointURL + 'product/deleteProductAfterSold/' + productId, {}).subscribe();
  }

  onIndicateReturn(productId): void {
    this.httpClient.put(environment.endpointURL + 'transaction/indicateReturn/' + productId, {}).subscribe();
    setTimeout(() => {
      this.ngOnInit();
    }, 100);
  }
  onConfirmReturn(productId): void {
    this.httpClient.put(environment.endpointURL + 'transaction/confirmReturn/' + productId, {}).subscribe();
    setTimeout(() => {
      this.ngOnInit();
    }, 100);  }
}
