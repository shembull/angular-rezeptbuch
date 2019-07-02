import {Ingredient} from './ingredient';

export interface ShoppingListStore {
  categories: string[];
  unique_items: Ingredient[];
  items: Ingredient[];
  amounts_cat: Map<string, number>;
  amounts_in: Map<string, number>;
}
