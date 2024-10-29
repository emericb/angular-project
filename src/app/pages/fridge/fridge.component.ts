import { Component } from '@angular/core';
import {ProductComponent} from '../../components/product/product.component';

@Component({
  selector: 'app-fridge',
  standalone: true,
  imports: [
    ProductComponent
  ],
  templateUrl: './fridge.component.html',
  styleUrl: './fridge.component.css'
})
export class FridgeComponent {

}
