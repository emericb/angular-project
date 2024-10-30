import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FridgeService } from '../../service/fridge.service';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fridg',
  templateUrl: './fridge.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./fridge.component.css']
})
export class FridgeComponent implements OnInit {
  newProduct: string = '';
  fridge: string[] = [];
  suggestedRecipes: any[] = [];
  products: Product[] = [];

  constructor(private fridgeService: FridgeService, private productService: ProductService, private router: Router) {
  }

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

  deleteProduct(index: number): void {
    const deletedProduct = this.fridge.splice(index, 1)[0];
    localStorage.setItem('fridge', JSON.stringify(this.fridge));
    this.products.push({
      id: 0,
      name: deletedProduct,
      code: '',
      category: '',
      quantity: 0,
      energyKcal: 0,
      allergens: '',
      labels: '',
      selected: false
    });
    this.fetchSuggestedRecipes();
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

  viewRecipeDetails(recipeId: number): void {
    this.router.navigate(['/pages/recipeDetails', recipeId]);
  }
}
