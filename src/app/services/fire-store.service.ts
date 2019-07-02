import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {config} from '../app.config';
import {BehaviorSubject, Observable} from 'rxjs';
import {Recipe} from '../interfaces/recipe';
import {Ingredient} from '../interfaces/ingredient';
import {RecipeFireStore} from '../interfaces/recipe-fire-store';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {
  recipes: AngularFirestoreCollection<RecipeFireStore>;
  localRecipes: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);
  constructor(private db: AngularFirestore) {
    this.recipes = this.db.collection<RecipeFireStore>(config.collection_recipes);
  }
  async getRecipes(): Promise<Observable<Recipe[]>> {
    await this.valueParserArray(this.recipes.valueChanges());
    return this.localRecipes.asObservable();
  }
  async getRecipe(id: string): Promise<Recipe> {
    const docRef = this.recipes.doc<RecipeFireStore>(id);
    const doc = await docRef.get().toPromise();
    if (doc.exists) {
      return this.valueParserSingle(doc.data() as RecipeFireStore);
    }
    return null;
  }
  private valueParserArray(input: Observable<RecipeFireStore[]>): void {
    const localRecipeArray: Recipe[] = [];
    input.subscribe(value => {
      value.forEach(element => {
        localRecipeArray.push(this.valueParserSingle(element));
      });
      this.localRecipes.next(localRecipeArray);
    });
  }
  private valueParserSingle(input: RecipeFireStore): Recipe {
    const recipe: Recipe = {amounts: new Map<string, number>(), description: '', id: '', ingredients: [], pictures: [], time: 0, title: ''};
    recipe.description = input.description;
    recipe.id = input.id;
    recipe.pictures = input.pictures;
    recipe.title = input.title;
    recipe.time = input.time;
    Object.keys(input.amounts).forEach(ingredient => {
      recipe.amounts.set(ingredient, input.amounts[ingredient]);
    });
    input.ingredients.forEach(docRefIn => {
      docRefIn.get().then( val => {
          recipe.ingredients.push(val.data() as Ingredient);
        }
      );
    });
    return recipe;
  }
}
