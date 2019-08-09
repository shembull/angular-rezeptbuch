import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data-service.service';
import {FireStoreService} from '../services/fire-store.service';
import {Recipe} from '../interfaces/recipe';
import {AuthService} from '../services/auth.service';
import {User} from '../interfaces/user';
import {environment} from '../../environments/environment';
import {LocalDataService} from '../services/local-data.service';

@Component({
  selector: 'app-recipes-view',
  templateUrl: './recipes-view.component.html',
  styleUrls: ['./recipes-view.component.css']
})
export class RecipesViewComponent implements OnInit {

  recipes: Recipe[];
  private user: User;

  constructor(
    private dataService: DataService,
    private fireStore: FireStoreService,
    private auth: AuthService,
    private localData: LocalDataService,
    ) { }

  // convert minutes to hours and minutes since the time is only stored in minutes
  static getTimeString(time: number): string {
    const minutes = time % 60;
    const hour = (time - minutes) / 60;
    if (hour > 0) {
      return hour.toString().concat('h ', minutes.toString(), 'min');
    }
    return minutes.toString().concat('min');
  }

  async ngOnInit() {

    if (environment.offline) {
      this.localData.localRecipesObservable.subscribe(recipes => this.recipes = recipes);
    } else {
      // get recipes from database and subscribe to them
      (await this.fireStore.getRecipes()).subscribe(recipes => this.recipes = recipes);
    }
    // get the currently logged in user
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
  }

  // if add all ingredients from a recipe to the shopping list if the user is logged in
  addToList(recipe: Recipe) {
    if (this.user || environment.offline) {
      if (environment.offline) {
        this.localData.addItemToList(recipe.ingredients, recipe.amounts);
      } else {
        this.fireStore.addItemToList(recipe.ingredients, recipe.amounts, this.user.shoppingList.id);
      }
    } else {
      alert('Bitte log dich erst ein');
    }
  }

  getTimeString(time: number): string {
    return RecipesViewComponent.getTimeString(time);
  }
}
