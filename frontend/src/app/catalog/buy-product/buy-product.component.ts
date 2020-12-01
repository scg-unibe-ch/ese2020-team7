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
  testDate = null;


  zipPattern = '^[0-9]*$';

  deliveryForm = this.formBuilder.group({
    deliveryStreet: [null, Validators.required],
    deliveryPinCode: [null, [Validators.required, Validators.pattern(this.zipPattern)]],
    deliveryCity: [null, Validators.required],
    deliveryCountry: [null, Validators.required],
  });

  returnDateForm = this.formBuilder.group({
    returnDate: [null, Validators.required],
  });


  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {}

  get f(): any { return this.deliveryForm.controls; }


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
        this.deliveryForm.disable({ emitEvent: false });
      }
      if (product.isSelling && product.isProduct){
        this.returnDateForm.controls.requiredControl.clearValidators();
        this.returnDateForm.updateValueAndValidity();
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
      this.deliveryForm.patchValue({
        deliveryStreet: null,
        deliveryPinCode: null,
        deliveryCity: null,
        deliveryCountry: null
      });
    }
    if (this.deliveryForm.invalid) {
      return;
    }
    this.httpClient.post(environment.endpointURL + 'transaction/buy/' + this.productId, {
      returnDate: this.returnDateForm.get('returnDate').value,
      deliveryStreet: this.deliveryForm.get('deliveryStreet').value,
      deliveryPinCode: this.deliveryForm.get('deliveryPinCode').value,
      deliveryCity: this.deliveryForm.get('deliveryCity').value,
      deliveryCountry: this.deliveryForm.get('deliveryCountry').value,
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
    this.deliveryForm.patchValue({
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
    this.deliveryForm.enable({ emitEvent: false });
    this.deliveryForm.controls.requiredControl.setValidators([Validators.required]);
    this.deliveryForm.controls.deliveryPincode.setValidators([Validators.pattern(this.zipPattern)]);
    this.deliveryForm.updateValueAndValidity(); // this is to rerun form validation after removing the validation for a field.
  }
  uncheckDeliver(): void {
    this.deliver = false;
    this.deliveryForm.disable({ emitEvent: false });
    this.deliveryForm.controls.requiredControl.clearValidators();
    this.deliveryForm.updateValueAndValidity(); // this is to rerun form validation after removing the validation for a field.
  }

  getDate(): void{
    this.testDate = this.returnDateForm.get('returnDate').value;
  }
}
