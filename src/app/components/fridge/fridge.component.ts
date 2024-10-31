import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product.model';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-fridge',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css']
})
export class FridgeComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = ''; // Initialise le terme de recherche

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // S'abonner aux changements des produits
    this.productService.getUpdatedProducts().subscribe((data: Product[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Erreur lors de la mise à jour des produits :', error);
      }
    );
  }

  // Méthode pour filtrer les produits selon le terme de recherche
  filteredProducts(): Product[] {
    return this.products
      .filter(product => product.quantity != null && product.quantity > 0) // Filtre les produits avec quantité > 0
      .filter(product =>
        !this.searchTerm || product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) // Filtre selon le terme de recherche
      );
  }

  decrementQuantity(productName: string): void {
    const product = this.products.find(p => p.name === productName);

    if (product) {
      if (product.quantity != null && product.quantity > 0) {
        product.quantity--;

        // Appel au service pour mettre à jour la BDD
        this.productService.decrementProductQuantity(productName).subscribe(
          () => {
            console.log(`${product.name} a été décrémenté. Nouvelle quantité: ${product.quantity}`);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du produit :', error);
          }
        );
      } else {
        alert('La quantité ne peut pas être inférieure à zéro.');
      }
    } else {
      alert(`Produit avec le nom "${productName}" non trouvé.`);
    }
  }
}
