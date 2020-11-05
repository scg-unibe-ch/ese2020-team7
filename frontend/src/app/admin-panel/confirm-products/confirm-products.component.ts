import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm-products',
  templateUrl: './confirm-products.component.html',
  styleUrls: ['./confirm-products.component.css']
})
export class ConfirmProductsComponent  {

  addedProducts: string[] = ['Phone', 'Tomato', 'Rock'];

}
