import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product} from '../../model/product.model';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

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

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        // Ajout dynamique des propriétés 'selected' et 'quantity' à chaque produit
        this.products = data.map(product => ({
          ...product,      // Garde toutes les autres propriétés originales
          selected: false, // Ajoute 'selected' temporairement
          quantity: 1      // Ajoute 'quantity' temporairement
        }));
      },
      error => {
        console.error('Erreur lors de la récupération des produits', error);
      }
    );
  }


  // Méthode appelée lors de la soumission du formulaire
  onSubmit(): void {
    const selectedProducts = this.products
      .filter(product => product.selected)
      .map(product => ({ name: product.name, quantity: product.quantity }));

    console.log('Produits sélectionnés :', selectedProducts);
    // Tu peux ici envoyer ces données vers un backend ou faire autre chose avec
  }
}
