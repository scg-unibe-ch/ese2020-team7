import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  userId: number;
  userName = '';
  userToken: string;
  loggedIn = false;
  submissionDone = false;
  submitted = false;
  isProductChecked = true;

  error: boolean;
  errorMessage: string;

  pricePattern = '^[0-9]\\d*(?:\\.\\d)?5?$';

  productForm = this.formBuilder.group({
    title: ['', Validators.required],
    isProduct: [null, Validators.required],
    price: ['', [Validators.required, Validators.pattern(this.pricePattern)]],
    description: ['', Validators.required],
    location: ['', Validators.required],
    isSelling: [null, Validators.required],
    isDeliverable: [null, Validators.required]
  });
  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder) {}

  get f(): any { return this.productForm.controls; }

  ngOnInit(): void {
    this.checkUserStatus();
  }

  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');
    this.userId = JSON.parse(localStorage.getItem('userId'));
    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
  }

  submit(): void{
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.httpClient.post(environment.endpointURL + 'product/add', {
      title: this.productForm.get('title').value,
      isProduct: this.productForm.get('isProduct').value,
      price: this.productForm.get('price').value,
      description: this.productForm.get('description').value,
      location: this.productForm.get('location').value,
      isSelling: this.productForm.get('isSelling').value,
      isAvailable: true,
      isDeliverable: this.productForm.get('isDeliverable').value,
      userId: this.userId
    }).subscribe(() => {
      this.submissionDone = true;
      // tslint:disable-next-line:no-unused-expression
    }), (error => {
      this.error = true;
      this.errorMessage = error;
    });
  }

  newSubmission(): void{
    this.submissionDone = false;
    this.productForm.reset();
    this.submitted = false;
    this.isProductChecked = true;
  }

  checkIsProduct(): void{
    this.isProductChecked = true;
    this.productForm.patchValue({
      isSelling: null,
      isDeliverable: null,
    });
  }
  uncheckIsProduct(): void {
    this.isProductChecked = false;
    this.productForm.patchValue({
      isSelling: false,
      isDeliverable: false,
    });
  }
}
