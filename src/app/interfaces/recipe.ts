import {Ingredient} from './ingredient';

export interface Recipe {
  title: string;
  pictures: string[];
  time: number;
  ingredients: Ingredient[];
  amounts: Map<string, number>;
  description: string;
  id: string;
}
