import {Component} from '@angular/core';
import { products } from './products';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  products = products;

  purchase(): void {
    window.alert('The add-product has been bought! Hooray!');
  }
}





