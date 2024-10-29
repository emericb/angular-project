import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {
  private apiUrl = '/api/recipes/suggest';

  constructor(private http: HttpClient) {}

  getSuggestedRecipes(fridge: string[]): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl, fridge);
  }
}
