import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Product} from '../../model/product.model';
import {ProductService} from '../../service/product.service';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-fridge',
  standalone: true,
  imports: [FormsModule, NgForOf],
  templateUrl: './fridge.component.html',
  styleUrl: './fridge.component.css'
})
export class FridgeComponent implements OnInit {
  products!: Product[];
  searchTerm!: string;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  filteredProducts() {
    if (!this.searchTerm) {
      return this.products;
    }
    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
