import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Product} from '../../../models/product.model';

@Component({
  selector: 'app-unapproved-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  @Input()
  product: Product = new Product(null,  null, '', null, null, '', '', null, null, null, '', null, '', null, null, null, false, null, null, null, null);

  @Output()
  update = new EventEmitter<Product>();

  @Output()
  delete = new EventEmitter<Product>();

  rejectField = false;
  approved = false;
  rejected = false;
  rejectionReason = '';

  constructor() { }

  approve(): void {
    // Emits event to parent component that TodoList got updated
    this.update.emit(this.product);
    this.approved = true;
  }

  reject(): void {
    // Emits event to parent component that TodoList got updated
    this.product.rejectionReason = this.rejectionReason;
    this.delete.emit(this.product);
    this.rejected = true;
  }

  openReject(): void {
    this.rejectField = true;
  }
}
