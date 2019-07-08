import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {User} from '../interfaces/user';
import {FireStoreService} from './fire-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private fs: FireStoreService,
    private router: Router,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.fs.getUser(user.uid);
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    let credential;
    try {
      credential = await this.afAuth.auth.signInWithPopup(provider);
      return this.updateUserData(credential.user);
    } catch (e) {
      alert(e.message);
    }
  }

  private async updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.fs.getUserRef(user.uid);
    let data;
    const userDb = await userRef.get().toPromise();
    if (userDb.data() === undefined) {
      data = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        shoppingList: await this.fs.createNewShoppingList(),
      };
      return userRef.set(data, {merge: true});
    }
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
    this.fs.setBadgeCount(0);
  }
}
