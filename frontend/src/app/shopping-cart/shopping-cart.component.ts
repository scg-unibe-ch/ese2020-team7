import {Component} from '@angular/core';

export interface Transaction {
  product: string;
  cost: number;
}

@Component({
  selector: 'app-shopping-cart',
  styleUrls: ['./shopping-cart.component.css'],
  templateUrl: './shopping-cart.component.html',
})

export class ShoppingCartComponent {
  displayedColumns = ['product', 'cost'];
  transactions: Transaction[] = [];

  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }
}