type productName = {
  productName: string;
  quantity: number;
}

export interface RecipeDetails {

  recipeName: string;
  products: productName[];
  desiredServings: number;
  caloriesPerServing: number;
  allergens: string[];
}
