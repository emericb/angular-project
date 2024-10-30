import { Routes } from '@angular/router';
import {FridgeComponent} from './components/fridge/fridge.component';
import {TestComponent} from './components/test/test.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: "full" },
  { path: 'test', component: TestComponent },
  { path: 'fridge', component: FridgeComponent },
];
