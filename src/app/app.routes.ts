import { Routes } from '@angular/router';
import {ProductComponent} from './components/product/product.component';
import {FridgeComponent} from './pages/fridge/fridge.component';
import {RecipeComponent} from './components/recipe/recipe.component';

export const routes: Routes = [
  { path: 'fridge', component: FridgeComponent },
  { path: 'products', component: ProductComponent },
  { path: 'recipes', component: RecipeComponent },
];
