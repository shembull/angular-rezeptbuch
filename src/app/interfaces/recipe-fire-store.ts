import {DocumentReference} from '@angular/fire/firestore';

// define structure for recipes in database
export interface RecipeFireStore {
  title: string;
  pictures: string[];
  time: number;
  ingredients: DocumentReference[];
  amounts: object;
  description: string;
  id: string;
}
