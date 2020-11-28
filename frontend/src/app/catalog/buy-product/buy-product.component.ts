import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product.model';
import {Transaction} from '../../models/transaction.model';
import {User} from '../../models/user.model';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  transaction: Transaction = new Transaction(null, null, null, null, '', null, '', '');
  product: Product = new Product(null, null, '', null, null, '', '', null, null, null, '', null, '', null, null, null);
  seller: User = new User(null, '', '', '', '', '', '', null, null, null, null, null, null, null);
  buyer: User = new User(null, '', '', '', '', '', '', null, null, null, null, null, null, null);

  productId: number;
  userId: number;
  userName = '';
  userToken: string;
  loggedIn = false;
  userNameOrMail = '';
  sellerId: number;
  submissionDone = false;
  error: boolean;
  errorMessage: string;
  submitted = false;


  zipPattern = '^[0-9]*$';

  transactionForm = this.formBuilder.group({
    deliveryStreet: ['', Validators.required],
    deliveryPinCode: [null, [Validators.required, Validators.pattern(this.zipPattern)]],
    deliveryCity: ['', Validators.required],
    deliveryCountry: ['', Validators.required],
  });


  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {}

  get f(): any { return this.transactionForm.controls; }


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
    this.httpClient.get(environment.endpointURL + 'user/id/' + this.userId, {
    }).subscribe((user: User) => {
      console.log(user);
      this.buyer = user;
      return;
    });
  }

  buy(): void {
    this.submitted = true;
    if (this.transactionForm.invalid) {
      return;
    }
    this.httpClient.post(environment.endpointURL + 'transaction/buy/' + this.productId, {
      deliveryStreet: this.transactionForm.get('deliveryStreet').value,
      deliveryPinCode: this.transactionForm.get('deliveryPinCode').value,
      deliveryCity: this.transactionForm.get('deliveryCity').value,
      deliveryCountry: this.transactionForm.get('deliveryCountry').value,
    }).subscribe((res: any) => {
      console.log(res);
      this.transaction = res;
      this.submissionDone = true;
    }), (error => {
      this.error = true;
      this.errorMessage = error;
    });
  }

  checkUserStatus(): void {
    this.userId = JSON.parse(localStorage.getItem('userId'));
    this.userToken = localStorage.getItem('userToken');
    this.userNameOrMail = localStorage.getItem('userName');
    this.loggedIn = !!(this.userToken);
  }
}
