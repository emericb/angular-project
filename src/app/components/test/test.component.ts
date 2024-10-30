import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product.model';
import {FormsModule, NgForm} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class TestComponent implements OnInit {
  products: Product[] = []; // La liste des produits sera remplie par la BDD

  constructor(private productService: ProductService) {}

  // Récupérer les produits à l'initialisation du composant
  ngOnInit(): void {
    this.fetchProducts();
  }

  // Méthode pour récupérer les produits depuis le service
  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        // Ajout dynamique des propriétés 'selected' et 'quantity' à chaque produit
        this.products = data.map(product => ({
          ...product,      // Garde toutes les autres propriétés originales
          selected: false, // Ajoute 'selected' temporairement
          quantity: null   // Ajoute 'quantity' temporairement
        }));
      },
      error => {
        console.error('Erreur lors de la récupération des produits', error);
      }
    );
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit(form: NgForm): void {
    const selectedProducts = this.products
      .filter(product => product.selected)
      .map(product => ({ name: product.name, quantity: product.quantity }));

    console.log('Produits sélectionnés :', selectedProducts);

    // Appel du service pour envoyer les produits sélectionnés au backend
    this.productService.saveSelectedProducts(selectedProducts).subscribe(
      (response) => {
        // Succès : ici tu traites la réponse du backend
        console.log('Réponse du backend :', response);
      },
      (error) => {
        // Gestion des erreurs
        console.error('Erreur lors de l\'envoi des produits :', error);
        alert('Une erreur est survenue lors de l\'ajout des produits.');
      }
    );
    form.resetForm();
  }
}
