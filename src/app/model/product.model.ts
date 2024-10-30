export interface Product {
  id: number;
  code: string;
  name: string;
  category: string;
  quantity?: number | null;
  energyKcal: number;
  allergens: string;
  labels: string;
  selected: boolean;
}
