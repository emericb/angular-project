import { Routes } from '@angular/router';
import {TestComponent} from './components/test/test.component';
import {AmazonComponent} from './components/amazon/amazon.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: "full" },
  { path: 'test', component: TestComponent },
  { path: 'amazon', component: AmazonComponent }
];
