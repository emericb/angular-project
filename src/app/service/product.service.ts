import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = '/api/products';
  private productsSubject = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {
    // Charger les produits au démarrage
    this.refreshProducts();
  }

  // Récupérer l'URL de l'API
  getApiUrl(): Observable<string> {
    return this.http.get<string>(this.apiUrl);
  }

  // Méthode pour récupérer les produits
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Sauvegarder les produits sélectionnés
  saveSelectedProducts(selectedProducts: any[]): Observable<any> {
    return this.http.post(this.apiUrl + '/add', selectedProducts, { responseType: 'text' }).pipe(
      tap(() => {
        // Après la sauvegarde, rafraîchir la liste des produits
        this.refreshProducts();
      })
    );
  }

  // Méthode pour rafraîchir les produits
  refreshProducts(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe(
      (products) => {
        this.productsSubject.next(products); // Mise à jour de la liste des produits
      },
      (error) => {
        console.error('Erreur lors du rafraîchissement des produits', error);
      }
    );
  }

  // Observable pour que d'autres composants puissent s'abonner et recevoir les produits mis à jour
  getUpdatedProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/update/${encodeURIComponent(product.name)}`, product);
  }

  decrementProductQuantity(productName: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/decrement/${encodeURIComponent(productName)}`, null);
  }
}
