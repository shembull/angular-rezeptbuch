import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {config} from '../app.config';
import {BehaviorSubject, Observable} from 'rxjs';
import {Recipe} from '../interfaces/recipe';
import {Ingredient} from '../interfaces/ingredient';
import {RecipeFireStore} from '../interfaces/recipe-fire-store';
import {DialogData} from '../interfaces/dialog-data';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {
  private recipes: AngularFirestoreCollection<RecipeFireStore>;
  private localRecipes: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);
  private ingredients: AngularFirestoreCollection<Ingredient>;

  constructor(private db: AngularFirestore) {
    this.recipes = this.db.collection<RecipeFireStore>(config.collection_recipes);
    this.ingredients = this.db.collection<Ingredient>(config.collection_ingredinets);
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

  getIngredients(): Observable<Ingredient[]> {
    return this.ingredients.valueChanges();
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
    const recipe: Recipe = {
      amounts: new Map<string, number>(),
      ingredients: [],
      description: input.description,
      id: input.id,
      pictures: input.pictures,
      time: input.time,
      title: input.title
    };
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

  addIngredient(data: DialogData) {
    const ing: Ingredient = {category: data.category, id: '', origin: '', title: data.title, unit: data.unit};
    this.ingredients.add(ing).then(docRef => {
      ing.id = docRef.id;
      docRef.set(ing);
    });
  }
}
