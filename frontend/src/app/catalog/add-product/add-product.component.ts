import {Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { environment } from '../../../environments/environment';
import {FormControl, FormBuilder, Validators} from '@angular/forms';
import {ProductAttributes} from '../../../../../backend/src/models/product.model';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  @Input()
  product: Product = new Product(null, false, '', '', null, '', '', null, null, null, '', null, '', null);


  userName = '';
  userToken: string;
  loggedIn = false;
  submissionDone = false;
  submitted = false;
  error: boolean;
  errorMessage: string;
  email = new FormControl('', [Validators.required, Validators.email]);

  productForm = this.formBuilder.group({
    title: ['', Validators.required],
    type: ['', Validators.required],
    price: ['', Validators.required],
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

    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
  }

  submit(): void{
    if (this.productForm.invalid) {
      return;
    }
    this.submitted = true;
    this.httpClient.post(environment.endpointURL + 'product/add', {
      title: this.productForm.get('title').value,
      type: this.productForm.get('type').value,
      price: this.productForm.get('price').value,
      description: this.productForm.get('description').value,
      location: this.productForm.get('location').value,
      isSelling: this.productForm.get('isSelling').value,
      isAvailable: true,
      isDeliverable: this.productForm.get('isSelling').value,
      userId: 1
    }).subscribe((instance: ProductAttributes) => {
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
  }
/*
  getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
*/
}
