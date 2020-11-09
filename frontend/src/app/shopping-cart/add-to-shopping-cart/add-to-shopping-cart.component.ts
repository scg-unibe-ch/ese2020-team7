import {Component} from '@angular/core';

@Component({
    selector: 'app-add-to-shopping-cart',
    templateUrl: './add-to-shopping-cart.component.html',
  })

  export class AddToShoppingCartComponent {

  addToShCart(): void {
    //...
    window.alert('The product has been added to the shopping cart!');
  }
}
