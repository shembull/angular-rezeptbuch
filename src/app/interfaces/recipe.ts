import {Ingredients} from './ingredients';

export interface Recipe {
  title: string;
  pictures: string[2];
  time: number;
  ingredients: Ingredients[];
  description: string;
}
