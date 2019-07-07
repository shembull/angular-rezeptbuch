import {DocumentReference} from '@angular/fire/firestore';

export interface User {
  uid: string;
  email: string;
  shoppingList?: DocumentReference;
  displayName: string;
  photoURL?: string;
}
