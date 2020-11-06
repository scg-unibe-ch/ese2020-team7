import {Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { environment } from '../../../environments/environment';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent{

  @Input()
  product: Product = new Product(null, false, '', '', null, '', '', null, null, null, '', null, '', null);
  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder) {}

  productForm = this.formBuilder.group({
    title: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    location: ['', Validators.required],
    isSelling: ['', Validators.required],
    isAvailable: ['', Validators.required],
    isDeliverable: ['', Validators.required]
  });
  submit(): void{
    if (this.productForm.invalid) {
      return;
    }
    this.httpClient.post(environment.endpointURL + 'product/add', {
      title: this.productForm.get('title').value,
      type: this.productForm.get('type').value,
      price: this.productForm.get('price').value,
      description: this.productForm.get('description').value,
      location: this.productForm.get('location').value,
      isSelling: this.productForm.get('isSelling').value

    }).subscribe((instance: any) => {
    });
  }
}
