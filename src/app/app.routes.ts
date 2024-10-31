import { Routes } from '@angular/router';
import {ProductComponent} from './components/product/product.component';
import {FridgeComponent} from './pages/fridge/fridge.component';
import {RecipeComponent} from './components/recipe/recipe.component';
import {TestComponent} from './components/test/test.component';
import {RecipeDetailsComponent} from './pages/recipe-details/recipe-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: "full" },
  { path: 'test', component: TestComponent },
  { path: 'products', component: ProductComponent },
  { path: 'recipes', component: RecipeComponent },
  { path: 'fridge', component: FridgeComponent },
  { path: 'pages/recipeDetails/:id', component: RecipeDetailsComponent },
];
