import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product.model';
import {User} from '../../models/user.model';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {


  product: Product = new Product(null, null, '', null, null, '', '', null, null, null, '', null, '', null, null, null);
  seller: User = new User(null, '', '', '', '', '', '', null, null, null, null, null, null, null);

  productId: number;
  userId: number;
  userName = '';
  userToken: string;
  loggedIn = false;
  userNameOrMail = '';
  sellerId: number;

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productId = JSON.parse(this.route.snapshot.paramMap.get('id'));
    this.checkUserStatus();
    this.httpClient.get(environment.endpointURL + 'product/id/' + this.productId, {
    }).subscribe((product: Product) => {
      console.log(product);
      this.product = product;
      this.httpClient.get(environment.endpointURL + 'user/id/' + product.userId, {
      }).subscribe((user: User) => {
        console.log(user);
        this.seller = user;
        return;
      });
    });
  }

  buy(): void {
    this.httpClient.post(environment.endpointURL + 'user/login', {
      userNameOrMail: this.userNameOrMail,
      password: this.password
    }).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userName', res.user.userName);
      localStorage.setItem('admin', res.user.admin);
      localStorage.setItem('userId', res.user.userId);
      this.isAdmin = res.user.admin;
      this.checkUserStatus();
      window.location.reload();
    }, (error) => {
      this.loginError = true;
      this.errorMessage = error?.message;
    });
  }

  checkUserStatus(): void {
    this.userId = JSON.parse(localStorage.getItem('userId'));
    this.userToken = localStorage.getItem('userToken');
    this.userNameOrMail = localStorage.getItem('userName');
    this.loggedIn = !!(this.userToken);
  }
}
