import { Component, OnInit } from '@angular/core';
import { FridgeService } from '../../service/fridge.service';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product.model';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgSelectModule
  ],
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  newProduct: string = '';
  fridge: string[] = [];
  suggestedRecipes: any[] = [];
  products: Product[] = [];

  constructor(private fridgeService: FridgeService, private productService: ProductService) {}

  ngOnInit(): void {
    localStorage.clear();
    this.loadFridge();
    this.loadProducts();
  }

  loadFridge(): void {
    const storedFridge = localStorage.getItem('fridge');
    this.fridge = storedFridge ? JSON.parse(storedFridge) : [];
    this.fetchSuggestedRecipes();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  addProduct(): void {
    if (this.newProduct.trim()) {
      this.fridge.push(this.newProduct.trim());
      localStorage.setItem('fridge', JSON.stringify(this.fridge));
      this.products = this.products.filter(product => product.name !== this.newProduct);
      this.newProduct = '';
      this.fetchSuggestedRecipes();
    }
  }

  fetchSuggestedRecipes(): void {
    this.fridgeService.getSuggestedRecipes(this.fridge)
      .subscribe((recipes) => {
        if (Array.isArray(recipes)) {
          this.suggestedRecipes = recipes;
        } else {
          console.error('API response is not an array:', recipes);
          this.suggestedRecipes = [];
        }
      }, (error) => {
        console.error('Error fetching suggested recipes:', error);
        this.suggestedRecipes = [];
      });
  }
}
