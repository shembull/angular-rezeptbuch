import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Ingredient} from '../interfaces/ingredient';
import {ShoppingListStore} from '../interfaces/shopping-list-store';
import {FireStoreService} from './fire-store.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  get fabStatePaosition(): Observable<string> {
    return this._fabStatePaosition;
  }
  get shoppingList(): Observable<ShoppingListStore> {
    return this._shoppingList;
  }
  get shoppingListState(): Observable<string> {
    return this._shoppingListState;
  }
  get toolBarText(): Observable<string> {
    return this._toolBarText;
  }

  private toolBarTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  // tslint:disable-next-line:variable-name
  private _toolBarText: Observable<string> = this.toolBarTextSubject.asObservable();
  private shoppingListStateSubject: BehaviorSubject<string> = new BehaviorSubject<string>('closed');
  // tslint:disable-next-line:variable-name
  private _shoppingListState: Observable<string> = this.shoppingListStateSubject.asObservable();
  private shoppingListStoreSubject: BehaviorSubject<ShoppingListStore> = new BehaviorSubject<ShoppingListStore>(
    {categories: [], amounts_cat: new Map<string, number>(), unique_items: [], amounts_in: new Map<string, number>(), items: []}
    );
  // tslint:disable-next-line:variable-name
  private _shoppingList: Observable<ShoppingListStore> = this.shoppingListStoreSubject.asObservable();
  private fabStatePositionSubject: BehaviorSubject<string> = new BehaviorSubject<string>('rightShift');
  // tslint:disable-next-line:variable-name
  private _fabStatePaosition: Observable<string> = this.fabStatePositionSubject.asObservable();
  constructor(private fs: FireStoreService) { }

  setToolBarTitle(title: string): void {
    return this.toolBarTextSubject.next(title);
  }

  setShoppingListState(state: string): void {
    return this.shoppingListStateSubject.next(state);
  }

  updateShoppingList(element: Ingredient, add: boolean, amount: number): void {
    let ingredientsList = this.shoppingListStoreSubject.value;
    ingredientsList = this.updateIngredients(this.updateCategories(ingredientsList, element), element, amount);
    return this.shoppingListStoreSubject.next(ingredientsList);
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

  private updateIngredients(store: ShoppingListStore, element: Ingredient, amount?: number): ShoppingListStore {
    if (store.unique_items.indexOf(element) === -1) {
      store.unique_items.push(element);
    }
    if (element.origin === undefined) {
      if (store.amounts_in.get(element.title) === undefined) {
        store.amounts_in.set(element.title, amount);
      } else {
        store.amounts_in.set(element.title, store.amounts_in.get(element.title) + amount);
      }
    } else {
      if (store.amounts_in.get(element.title) === undefined) {
        this.fs.getRecipe(element.origin).then(recipe => {
          store.amounts_in.set(element.title, recipe.amounts.get(element.title));
        });
      } else {
        this.fs.getRecipe(element.origin).then(recipe => {
          store.amounts_in.set(element.title, store.amounts_in.get(element.title) + recipe.amounts.get(element.title));
        });
      }
    }
    const nonUniqueItem: Ingredient = {category: element.category, id: '', origin: '', title: element.title, unit: element.unit};
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

  setFabStatePosition(position: boolean): void {
    if (position) {
      return this.fabStatePositionSubject.next('leftShift');
    } else {
      return this.fabStatePositionSubject.next('rightShift');
    }
  }
}
