import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product.model';
import {Transaction} from '../../models/transaction.model';
import {User} from '../../models/user.model';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {FormBuilder, Validators} from '@angular/forms';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';



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
  transactionError = false;
  errorMessage: string;
  submitted = false;
  deliver = false;


  zipPattern = '^[0-9]*$';

  transactionForm = this.formBuilder.group({
    returnDate: [null, Validators.required],
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
      if (product.isDeliverable) {
        this.deliver = true;
      }
      if ((!product.isDeliverable) || (!product.isProduct)) {
        this.transactionForm.disable({ emitEvent: false });
      }
      if (product.isSelling){
        this.transactionForm.controls.requiredControl.clearValidators();
        this.transactionForm.updateValueAndValidity();
      }

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
    if (!this.deliver) {
      this.transactionForm.patchValue({
        deliveryStreet: null,
        deliveryPinCode: null,
        deliveryCity: null,
        deliveryCountry: null
      });
    }
    if (this.transactionForm.invalid) {
      return;
    }
    this.httpClient.post(environment.endpointURL + 'transaction/buy/' + this.productId, {
      returnDate: this.transactionForm.get('returnDate').value,
      deliveryStreet: this.transactionForm.get('deliveryStreet').value,
      deliveryPinCode: this.transactionForm.get('deliveryPinCode').value,
      deliveryCity: this.transactionForm.get('deliveryCity').value,
      deliveryCountry: this.transactionForm.get('deliveryCountry').value,
    }).subscribe((res: any) => {
      console.log(res);
      this.transaction = res;
      this.submissionDone = true;
    }, (error) => {
      this.transactionError = true;
      this.errorMessage = JSON.parse(error);
    });
  }

  useAddress(): void{
    this.transactionForm.patchValue({
      deliveryStreet: this.buyer.street,
      deliveryPinCode: this.buyer.pinCode,
      deliveryCity: this.buyer.city,
      deliveryCountry: this.buyer.country,
    });
  }

  checkUserStatus(): void {
    this.userId = JSON.parse(localStorage.getItem('userId'));
    this.userToken = localStorage.getItem('userToken');
    this.userNameOrMail = localStorage.getItem('userName');
    this.loggedIn = !!(this.userToken);
  }

  checkDeliver(): void {
    this.deliver = true;
    this.transactionForm.enable({ emitEvent: false });
    this.transactionForm.controls.requiredControl.setValidators([Validators.required]);
    this.transactionForm.controls.deliveryPincode.setValidators([Validators.pattern(this.zipPattern)]);
    this.transactionForm.updateValueAndValidity(); // this is to rerun form validation after removing the validation for a field.
  }
  uncheckDeliver(): void {
    this.deliver = false;
    this.transactionForm.disable({ emitEvent: false });
    this.transactionForm.controls.requiredControl.clearValidators();
    this.transactionForm.updateValueAndValidity(); // this is to rerun form validation after removing the validation for a field.
  }
}
