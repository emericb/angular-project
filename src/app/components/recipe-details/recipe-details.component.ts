import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { RecipeDetailsService } from '../../service/recipe-details.service';
import { RecipeDetails } from '../../model/recipeDetails.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  standalone: true,
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipeId: number | undefined;
  recipe: RecipeDetails | undefined;

  constructor(
    private route: ActivatedRoute,
    private recipeDetailsService: RecipeDetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.recipeId = id ? +id : undefined;
    if (typeof this.recipeId === 'number') {
      this.fetchRecipeDetails(this.recipeId);
    }
  }

  fetchRecipeDetails(id: number): void {
    this.recipeDetailsService.updateRecipeServings(id).subscribe(
      (data: RecipeDetails) => {
        this.recipe = data;
      },
      (error) => {
        console.error('Error fetching recipe details:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/recipe-suggest']);
  }
}
