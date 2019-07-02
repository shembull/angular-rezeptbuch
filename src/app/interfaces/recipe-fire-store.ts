import {Ingredient} from './ingredient';
import {DocumentReference} from '@angular/fire/firestore';

export interface RecipeFireStore {
  title: string;
  pictures: string[];
  time: number;
  ingredients: DocumentReference[];
  amounts: object;
  description: string;
  id: string;
}
