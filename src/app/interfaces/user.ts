import {DocumentReference} from '@angular/fire/firestore';

// define structure os user
export interface User {
  uid: string;
  email: string;
  shoppingList?: DocumentReference;
  displayName: string;
  photoURL?: string;
}
