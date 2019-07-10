import {Ingredient} from './ingredient';

// define structure for shopping list
export interface ShoppingListStore {
  categories: string[];
  unique_items: Ingredient[];
  items: Ingredient[];
  amounts_cat: Map<string, number>;
  amounts_in: Map<string, number>;
}
