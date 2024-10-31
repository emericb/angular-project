import { Routes } from '@angular/router';
import {TestComponent} from './components/test/test.component';
import {AmazonComponent} from './components/amazon/amazon.component';
import {RecipeDetailsComponent} from './components/recipe-details/recipe-details.component';
import {RecipeSuggestComponent} from './components/recipe-suggest/recipe-suggest.component';
import {HomeComponent} from './components/home/home.component';

export const routes: Routes = [
  //{ path: '', redirectTo: '', pathMatch: "full" },
  { path: '', component: HomeComponent },
  { path: 'amazon', component: AmazonComponent },
  { path: 'recipe-suggest', component: RecipeSuggestComponent },
  { path: 'recipe-details/:id', component: RecipeDetailsComponent },
  { path: 'test', component: TestComponent },
];
