import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Ingredient} from '../interfaces/ingredient';
import {CategoryStore} from '../interfaces/category-store';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  get categories(): Observable<CategoryStore> {
    return this._categories;
  }
  get shoppingList(): Observable<Ingredient[]> {
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
  private shoppingListSubject: BehaviorSubject<Ingredient[]> = new BehaviorSubject<Ingredient[]>([]);
  // tslint:disable-next-line:variable-name
  private _shoppingList: Observable<Ingredient[]> = this.shoppingListSubject.asObservable();
  private categoriesSubject: BehaviorSubject<CategoryStore> = new BehaviorSubject<CategoryStore>(
    {categories: [], amounts: new Map<string, number>()}
    );
  // tslint:disable-next-line:variable-name
  private _categories: Observable<CategoryStore> = this.categoriesSubject.asObservable();
  constructor() { }

  setToolBarTitle(title: string): void {
    return this.toolBarTextSubject.next(title);
  }

  setShoppingListState(state: string): void {
    return this.shoppingListStateSubject.next(state);
  }

  updateShoppingList(element: Ingredient, add: boolean): void {
    const ingredientsList = this.shoppingListSubject.value;
    if (add) {
      ingredientsList.push(element);
    } else {
      const i = ingredientsList.indexOf(element);
      if (i > -1) {
        ingredientsList.splice(i, 1);
      }
    }
    this.updateCategories(element.category);
    return this.shoppingListSubject.next(ingredientsList);
  }

  private updateCategories(category: string): void {
    const categoriesList = this.categoriesSubject.value;
    if (categoriesList.amounts.get(category) === undefined) {
      console.log(categoriesList.categories);
      categoriesList.categories.push(category);
      console.log(categoriesList.categories);
      categoriesList.amounts.set(category, 1);
    } else {
      categoriesList.amounts.set(
        category,
        categoriesList.amounts.get(category) + 1
      );
    }
    return this.categoriesSubject.next(categoriesList);
  }
}
