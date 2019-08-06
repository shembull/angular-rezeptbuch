import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference} from '@angular/fire/firestore';
import {config} from '../app.config';
import {BehaviorSubject, Observable} from 'rxjs';
import {Recipe} from '../interfaces/recipe';
import {Ingredient} from '../interfaces/ingredient';
import {RecipeFireStore} from '../interfaces/recipe-fire-store';
import {DialogData} from '../interfaces/dialog-data';
import {ShoppingListFireStore} from '../interfaces/shopping-list-fire-store';
import {ShoppingListStore} from '../interfaces/shopping-list-store';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {
  private recipes: AngularFirestoreCollection<RecipeFireStore>;
  private localRecipes: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);
  private ingredients: AngularFirestoreCollection<Ingredient>;
  private shoppingLists: AngularFirestoreCollection<ShoppingListFireStore>;
  private users: AngularFirestoreCollection<User>;
  private badgeCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // tslint:disable-next-line:variable-name
  private _badgeCount: Observable<number> = this.badgeCountSubject.asObservable();

  constructor(
    private db: AngularFirestore,
    ) {
    // definition of collections from database
    this.recipes = this.db.collection<RecipeFireStore>(config.collectionRecipes);
    this.ingredients = this.db.collection<Ingredient>(config.collectionIngredinets);
    this.shoppingLists = this.db.collection<ShoppingListFireStore>(config.collectionShoppingLists);
    this.users = this.db.collection<User>(config.collectionUsers);
  }

  // updated the category and amount list in the local store
  static updateCategories(store: ShoppingListStore, element: Ingredient): ShoppingListStore {
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

  // updated the category and amount list in the local store
  static updateIngredients(store: ShoppingListStore, element: Ingredient, amount: number): ShoppingListStore {
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

  getUser(uid: string): Observable<User> {
    return this.users.doc<User>(uid).valueChanges();
  }

  getUserRef(uid: string): AngularFirestoreDocument<User> {
    return this.users.doc(uid);
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

  // since the datastructure of the files from the database is different to the local datastructure the values have to be parsed
  private valueParserArray(input: Observable<RecipeFireStore[]>): void {
    const localRecipeArray: Recipe[] = [];
    input.subscribe(value => {
      value.forEach(element => {
        localRecipeArray.push(this.valueParserSingle(element));
      });
      this.localRecipes.next(localRecipeArray);
    });
  }

  // since the datastructure of the files from the database is different to the local datastructure the values have to be parsed
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

  // create new ingredient from dialogdata in database and save the created id in the document
  addIngredient(data: DialogData) {
    const ing: Ingredient = {category: data.category, id: '', origin: '', title: data.title, unit: data.unit};
    this.ingredients.add(ing).then(docRef => {
      ing.id = docRef.id;
      docRef.set(ing);
    });
  }

  // create new recipe in database and save the created id in the document
  addRecipe(recipe: RecipeFireStore): void {
    this.recipes.add(recipe).then(docRef => {
      recipe.id = docRef.id;
      docRef.set(recipe);
    });
  }

  // return shopping list from database
  async getShoppingListFireStore(listId: string): Promise<ShoppingListFireStore> {
    const fireListRef = this.shoppingLists.doc<ShoppingListFireStore>(listId);
    return (await fireListRef.get().toPromise()).data() as ShoppingListFireStore;
  }

  // convert the shopping list document from the database in the locally used format and return the list
  async getShoppingList(listId: string): Promise<ShoppingListStore> {
    let store: ShoppingListStore = {
      amounts_cat: new Map<string, number>(),
      amounts_in: new Map<string, number>(),
      categories: [],
      items: [],
      unique_items: []
    };
    const fireList = await this.getShoppingListFireStore(listId);
    fireList.items.forEach(async item => {
      const ing = (await this.getIngredientDoc(item.id).get()).data() as Ingredient;
      store = FireStoreService.updateIngredients(FireStoreService.updateCategories(store, ing), ing, fireList.amounts[ing.title]);
    });
    return store;
  }

  // add a new item to the local list local shopping list
  addItemToList(ingredients: Ingredient[], amount: Map<string, number>, listId: string) {
    let newList: ShoppingListFireStore;
    this.getShoppingListFireStore(listId).then(list => {
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
          newList.amounts[ingredientParam.title] = (
            Number(newList.amounts[ingredientParam.title]) +
            Number(amount.get(ingredientParam.title))
          ).toString();
        } else {
          newList.amounts[ingredientParam.title] = amount.get(ingredientParam.title).toString();
          newList.items.push(this.getIngredientDoc(ingredientParam.id));
        }
      });
      this.shoppingLists.doc(listId).set(newList);
    });
  }

  getListObservable(listId: string): Observable<ShoppingListFireStore> {
    return this.shoppingLists.doc<ShoppingListFireStore>(listId).valueChanges();
  }

  setBadgeCount(count: number): void {
    return this.badgeCountSubject.next(count);
  }

  // removes an item from the shopping list in the database
  removeItemFromList(ingredient: Ingredient, listId: string) {
    let newList: ShoppingListFireStore;
    const newItemArray: DocumentReference[] = [];
    this.getShoppingListFireStore(listId).then(list => {
      newList = list as ShoppingListFireStore;
      newList.items.forEach(item => {
        if (item.id !== ingredient.id) {
          newItemArray.push(item);
        }
      });
      newList.items = newItemArray;
      delete newList.amounts[ingredient.title];
      this.shoppingLists.doc(listId).set(newList);
    });
  }

  // creates a new shopping list for a first time signed in user
  async createNewShoppingList(): Promise<DocumentReference> {
    const list: ShoppingListFireStore = {amounts: {}, items: []};
    return (await this.shoppingLists.add(list));
  }
}
