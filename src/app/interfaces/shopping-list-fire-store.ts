import {DocumentReference} from '@angular/fire/firestore';

export interface ShoppingListFireStore {
  amounts: object;
  items: DocumentReference[];
}
