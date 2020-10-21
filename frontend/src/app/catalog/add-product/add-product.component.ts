import {Component, Input, OnInit} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { environment } from '../../../environments/environment';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
// Very messy WIP
export class AddProductComponent{
/*
  @Input()
  product: Product = new Product(null, '', [], null,'','',null, null, null,false);
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
  }
*/
  floatLabelControl: any;
}
