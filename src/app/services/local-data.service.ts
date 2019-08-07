import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ShoppingListStore} from '../interfaces/shopping-list-store';
import {Recipe} from '../interfaces/recipe';
import {recipe0} from '../local-recipes/recipe0';
import {recipe1} from '../local-recipes/recipe1';
import {Ingredient} from '../interfaces/ingredient';
import {DialogData} from '../interfaces/dialog-data';
import {
  backKakao, butter,
  chillischote, ei,
  knoblauchzehe, mehl,
  olivenoel,
  petersilie, schokolade,
  spaghetti, vanillezucker,
  zitrone,
  zucker
} from '../local-ingrdients/ingredient_file';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  private localShoppingList: ShoppingListStore = {
    amounts_cat: new Map<string, number>(),
    amounts_in: new Map<string, number>(),
    categories: [],
    items: [],
    unique_items: []
  };
  private localRecipes: Recipe[] = [recipe0, recipe1];
  private localIngredients: Ingredient[] = [chillischote, knoblauchzehe, olivenoel, petersilie, spaghetti, zitrone, zucker, backKakao, vanillezucker, mehl, butter, ei, schokolade];

  private localShoppingListSubject: BehaviorSubject<ShoppingListStore> = new BehaviorSubject(this.localShoppingList);
  private localRecipesSubject: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>(null);
  private localIngredientsSubject: BehaviorSubject<Ingredient[]> = new BehaviorSubject<Ingredient[]>(this.localIngredients);

  localShoppingListObservable: Observable<ShoppingListStore> = this.localShoppingListSubject.asObservable();
  localRecipesObservable: Observable<Recipe[]> = this.localRecipesSubject.asObservable();
  private localIngredinetsObservable: Observable<Ingredient[]> = this.localIngredientsSubject.asObservable();

  constructor() {
    this.localRecipes[0].amounts.set('Spaghetti', 300);
    this.localRecipes[0].amounts.set('Knoblauchzehe', 4);
    this.localRecipes[0].amounts.set('Petersilie', 5);
    this.localRecipes[0].amounts.set('Chillischote', 3);
    this.localRecipes[0].amounts.set('Olivenöl', 50);
    this.localRecipes[0].amounts.set('Zitrone', 1);
    this.localRecipes[1].amounts.set('Mehl', 300);
    this.localRecipes[1].amounts.set('Zucker', 500);
    this.localRecipes[1].amounts.set('Butter', 200);
    this.localRecipes[1].amounts.set('Schokolade', 200);
    this.localRecipes[1].amounts.set('Ei', 6);
    this.localRecipes[1].amounts.set('Back Kakao', 8);
    this.localRecipes[1].amounts.set('Vanillezucker', 8);
    this.localRecipesSubject.next(this.localRecipes);
  }

  getRecipe(recipeId: string): Recipe {
    return this.localRecipesSubject.value[Number(recipeId)];
  }

  addItemToList(ingredients: Ingredient[], amounts: Map<string, number>) {
    const list = this.localShoppingListSubject.value;
    ingredients.forEach(ingredientParam => {
      let checkOccurrence = false;
      list.items.forEach(ing => {
        if (ing.title === ingredientParam.title) {
          checkOccurrence = true;
        }
      });
      if (checkOccurrence) {
        list.amounts_cat.set(ingredientParam.category, (list.amounts_cat.get(ingredientParam.category ) + 1));
        list.amounts_in.set(ingredientParam.title, (list.amounts_in.get(ingredientParam.title ) + amounts.get(ingredientParam.title)));
      } else {
        list.amounts_cat.set(ingredientParam.category, 1);
        list.amounts_in.set(ingredientParam.title, amounts.get(ingredientParam.title));
        list.categories.push(ingredientParam.category);
        list.items.push(ingredientParam);
      }
    });
    this.localShoppingListSubject.next(list);
  }

  addIngredient(data: DialogData): void {
    const ing: Ingredient = {category: data.category, id: '', origin: '', title: data.title, unit: data.unit};
    const currentIng: Ingredient[] = this.localIngredientsSubject.value;
    currentIng.push(ing);
    this.localIngredientsSubject.next(currentIng);
    return;
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.localIngredinetsObservable;
  }

  addRecipe(recipe: Recipe): void {
    const currentRecipes: Recipe[] = this.localRecipesSubject.value;
    recipe.id = currentRecipes.length.toString();
    currentRecipes.push(recipe);
    this.localRecipesSubject.next(currentRecipes);
    return;
  }
}
