import {Ingredients} from './ingredients';

export interface Recipe {
  title: string;
  pictures: string[];
  time: number;
  ingredients: Ingredients[];
  description: string;
  id: string;
}
