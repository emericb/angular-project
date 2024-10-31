import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FridgeService } from '../../service/fridge.service';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-suggest',
  templateUrl: './recipe-suggest.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./recipe-suggest.component.css']
})
export class RecipeSuggestComponent implements OnInit {
  fridge: string[] = [];
  suggestedRecipes: any[] = [];
  products: Product[] = [];

  constructor(private fridgeService: FridgeService, private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.productService.getUpdatedProducts().subscribe((data: Product[]) => {
      this.products = data.filter(product => product.quantity != null && product.quantity > 0);
    });
    this.fridge = this.products.map(product => product.name);
    this.fetchSuggestedRecipes();
  }

  fetchSuggestedRecipes(): void {
    this.fridgeService.getSuggestedRecipes(this.fridge)
      .subscribe((recipes) => {
        if (Array.isArray(recipes)) {
          this.suggestedRecipes = recipes;
          console.log(this.suggestedRecipes);
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
    this.router.navigate(['/recipe-details', recipeId]);
  }
}
