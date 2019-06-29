import { Injectable } from '@angular/core';
import {Recipe} from '../interfaces/recipe';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {config} from '../app.config';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {
  recipes: AngularFirestoreCollection<Recipe>;

  constructor(private db: AngularFirestore) {
    this.recipes = this.db.collection<Recipe>(config.collection_recipes);
  }
  getRecipes(): Observable<Recipe[]> {
    return this.recipes.valueChanges();
  }
}
