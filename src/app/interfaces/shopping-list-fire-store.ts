import {DocumentReference} from '@angular/fire/firestore';

// define structure for shopping list in database
export interface ShoppingListFireStore {
  amounts: object;
  items: DocumentReference[];
}
