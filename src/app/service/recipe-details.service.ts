import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecipeDetails } from '../model/recipeDetails.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailsService {
  private apiUrl = '/api/recipes';

  constructor(private http: HttpClient) {}

  updateRecipeServings(id: number, servings: number = 1): Observable<RecipeDetails> {
    const url = `${this.apiUrl}/${id}/servings/${servings}`;
    console.log('Updating recipe servings:', url);
    return this.http.put<RecipeDetails>(url, {});
  }
}
