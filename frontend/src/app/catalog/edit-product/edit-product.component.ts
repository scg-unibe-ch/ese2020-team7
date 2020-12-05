import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import {environment} from '../../../environments/environment';
import {Product} from '../../models/product.model';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {DeleteProductDialogComponent} from '../../user-panel/delete-product-dialog/delete-product-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Location} from '@angular/common';



@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product = new Product(null, null, '', null, null, '', '', null, null, null, '', null, '',
    null, null, null, null, null, null, null);

  id: string;
  productId: number;
  productIdd: string;
  userId: number;
  userName = '';
  userToken: string;
  loggedIn = false;
  submissionDone = false;
  submitted = false;
  isProductChecked = false;
  userNameOrMail = '';

  error: boolean;
  errorMessage: string;

  pricePattern = '^[0-9]\\d*(?:\\.\\d)?5?$';

  titleOpen = true;
  priceOpen = true;
  isProductOpen = true;
  descriptionOpen = true;
  locationOpen = true;
  isSellingOpen = true;
  isDeliverableOpen = true;

  selectedRadio = true; // default value

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
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private location: Location) {}

  get f(): any { return this.productForm.controls; }

  ngOnInit(): void {
    this.productId = JSON.parse(this.route.snapshot.paramMap.get('id'));

    this.checkUserStatus();
    this.httpClient.get(environment.endpointURL + 'product/id/' + this.productId, {
    }).subscribe((product: Product) => {
      console.log(product);
      this.product = product;

      this.productForm.patchValue({
        title: product.title,
        isProduct: product.isProduct,
        price: product.price,
        description: product.description,
        location: product.location,
        isSelling: product.isSelling,
        isDeliverable: product.isDeliverable
      });
      if (product.isProduct === true){
        this.isProductChecked = true;
      }
    }, (error) => {
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

  edit(): void{
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.httpClient.put(environment.endpointURL + 'product/update/' + this.productId, {
      title: this.productForm.get('title').value,
      isApproved: false,
      isProduct: this.productForm.get('isProduct').value,
      price: this.productForm.get('price').value,
      description: this.productForm.get('description').value,
      location: this.productForm.get('location').value,
      isSelling: this.productForm.get('isSelling').value,
      isAvailable: true,
      isDeliverable: this.productForm.get('isDeliverable').value,
      rejectionReason: null,
      userId: this.userId
    }).subscribe(() => {
      this.submissionDone = true;
    }, (error) => {
      this.error = true;
      this.errorMessage = error;
    });
  }

  checkIsProduct(): void{
    this.isProductChecked = true;
    this.productForm.patchValue({
      isSelling: null,
      isDeliverable: null,
    });
    this.isSellingOpen = false;
    this.isDeliverableOpen = false;
  }
  uncheckIsProduct(): void {
    this.isProductChecked = false;
    this.productForm.patchValue({
      isSelling: false,
      isDeliverable: false,
    });
  }

  openTitle(): void{
    this.titleOpen = false;
  }
  openPrice(): void{
    this.priceOpen = false;
  }
  openIsProduct(): void{
    this.isProductOpen = false;
  }
  openDescription(): void{
    this.descriptionOpen = false;
  }
  openLocation(): void{
    this.locationOpen = false;
  }
  openIsSelling(): void{
    this.isSellingOpen = false;
  }
  openIsDeliverable(): void{
    this.isDeliverableOpen = false;
  }

  radioChange(): void{
    console.log(this.selectedRadio);
  }

  openDialog(productId): any {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res) {
        this.onDelete(productId);
      }
      this.back();
    });
  }

  onDelete(productId): void {
    this.httpClient.delete(environment.endpointURL + 'product/delete/' + productId).subscribe();
  }

  delete(): void{
    this.openDialog(this.product.productId);
  }

  back(): void {
    this.location.back();
  }
}
