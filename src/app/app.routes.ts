import { Routes } from '@angular/router';
import {ProductComponent} from './components/product/product.component';
import {RecipeComponent} from './components/recipe/recipe.component';
import {TestComponent} from './components/test/test.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: "full" },
  { path: 'test', component: TestComponent },
  { path: 'products', component: ProductComponent },
  { path: 'recipes', component: RecipeComponent },
];
