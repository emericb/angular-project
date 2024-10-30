import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FridgeService } from '../../service/fridge.service';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  fridge: string[] = [];
  suggestedRecipes: any[] = [];
  products: Product[] = [];

  constructor(private fridgeService: FridgeService, private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadFridge();
  }

  loadFridge(): void {
    this.productService.getUpdatedProducts().subscribe((data: Product[]) => {
        console.log(this.fridge);
        this.fridge = data.map(product => product.name);
        console.log(this.fridge);
        this.fetchSuggestedRecipes();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour des produits :', error);
      }
    );
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
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
