import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {config} from '../app.config';
import {BehaviorSubject, Observable} from 'rxjs';
import {Recipe} from '../interfaces/recipe';
import {Ingredient} from '../interfaces/ingredient';
import {RecipeFireStore} from '../interfaces/recipe-fire-store';
import {DialogData} from '../interfaces/dialog-data';
import {ShoppingListFireStore} from '../interfaces/shopping-list-fire-store';
import {ShoppingListStore} from '../interfaces/shopping-list-store';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {
  private recipes: AngularFirestoreCollection<RecipeFireStore>;
  private localRecipes: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);
  private ingredients: AngularFirestoreCollection<Ingredient>;
  private shoppingLists: AngularFirestoreCollection<ShoppingListFireStore>;
  private badgeCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // tslint:disable-next-line:variable-name
  private _badgeCount: Observable<number> = this.badgeCountSubject.asObservable();

  constructor(
    private db: AngularFirestore,
    ) {
    this.recipes = this.db.collection<RecipeFireStore>(config.collection_recipes);
    this.ingredients = this.db.collection<Ingredient>(config.collection_ingredinets);
    this.shoppingLists = this.db.collection<ShoppingListFireStore>(config.collection_shoppingLists);
  }
  get badgeCount(): Observable<number> {
    return this._badgeCount;
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

  getIngredientDoc(id: string): DocumentReference {
    return this.ingredients.doc(id).ref;
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

  addRecipe(recipe: RecipeFireStore): void {
    this.recipes.add(recipe).then(docRef => {
      recipe.id = docRef.id;
      docRef.set(recipe);
    });
  }

  async getShoppingListFireStore(id?: string): Promise<ShoppingListFireStore> {
    const debugId = 'RDhLawXLDkl4aCENKKWK';
    const fireListRef = this.shoppingLists.doc<ShoppingListFireStore>(debugId);
    return (await fireListRef.get().toPromise()).data() as ShoppingListFireStore;
  }

  async getShoppingList(id?: string): Promise<ShoppingListStore> {
    let store: ShoppingListStore = {
      amounts_cat: new Map<string, number>(),
      amounts_in: new Map<string, number>(),
      categories: [],
      items: [],
      unique_items: []
    };
    const fireList = await this.getShoppingListFireStore();
    fireList.items.forEach(async item => {
      const ing = (await this.getIngredientDoc(item.id).get()).data() as Ingredient;
      store = this.updateIngredients(this.updateCategories(store, ing), ing, fireList.amounts[ing.title]);
      this.setBadgeCount(store.items.length);
    });
    return store;
  }

  private updateCategories(store: ShoppingListStore, element: Ingredient): ShoppingListStore {
    // Check if category is already present
    if (store.amounts_cat.get(element.category) === undefined) {
      // Add category to array and update amount
      store.categories.push(element.category);
      store.amounts_cat.set(element.category, 1);
    } else {
      if (store.amounts_in.get(element.title) === undefined) {
        store.amounts_cat.set(element.category, store.amounts_cat.get(element.category) + 1);
      }
    }
    return store;
  }

  private updateIngredients(store: ShoppingListStore, element: Ingredient, amount: number): ShoppingListStore {
    if (store.unique_items.indexOf(element) === -1) {
      store.unique_items.push(element);
    }
    if (store.amounts_in.get(element.title) === undefined) {
      store.amounts_in.set(element.title, amount);
    } else {
      store.amounts_in.set(element.title, store.amounts_in.get(element.title) + amount);
    }
    const nonUniqueItem: Ingredient = {category: element.category, id: element.id, origin: '', title: element.title, unit: element.unit};
    let occurrenceCheck = false;
    store.items.forEach(el => {
      if (el.title === nonUniqueItem.title) {
        occurrenceCheck = true;
      }
    });
    if (!occurrenceCheck) {
      store.items.push(nonUniqueItem);
    }
    return store;
  }

  addItemToList(ingredients: Ingredient[], amount: Map<string, number>, id?: string) {
    let newList: ShoppingListFireStore;
    this.getShoppingListFireStore().then(list => {
      newList = list as ShoppingListFireStore;
      ingredients.forEach(ingredientParam => {
        let checkOccurrence = false;
        Object.keys(list.amounts).forEach(ing => {
          if (ing === ingredientParam.title) {
            checkOccurrence = true;
            return;
          }
        });
        if (checkOccurrence) {
          newList.amounts[ingredientParam.title] = (Number(newList.amounts[ingredientParam.title]) + Number(amount.get(ingredientParam.title))).toString();
        } else {
          newList.amounts[ingredientParam.title] = amount.get(ingredientParam.title).toString();
          newList.items.push(this.getIngredientDoc(ingredientParam.id));
        }
      });
      this.shoppingLists.doc('RDhLawXLDkl4aCENKKWK').set(newList);
    });
  }

  getListObservable(id?: string): Observable<ShoppingListFireStore> {
    id = 'RDhLawXLDkl4aCENKKWK';
    return this.shoppingLists.doc<ShoppingListFireStore>(id).valueChanges();
  }

  setBadgeCount(count: number): void {
    return this.badgeCountSubject.next(count);
  }

  removeItemFromList(ingredient: Ingredient) {
    let newList: ShoppingListFireStore;
    const newItemArray: DocumentReference[] = [];
    this.getShoppingListFireStore().then(list => {
      newList = list as ShoppingListFireStore;
      newList.items.forEach(item => {
        if (item.id !== ingredient.id) {
          newItemArray.push(item);
        }
      });
      newList.items = newItemArray;
      delete newList.amounts[ingredient.title];
      this.shoppingLists.doc('RDhLawXLDkl4aCENKKWK').set(newList);
    });
  }
}
