import { Component, OnInit } from '@angular/core';
import {LocalDataService} from '../services/local-data.service';
import {Recipe} from '../interfaces/recipe';
import {RecipesViewComponent} from '../recipes-view/recipes-view.component';
import {environment} from '../../environments/environment';
import {User} from '../interfaces/user';
import {FireStoreService} from '../services/fire-store.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  recipe: Recipe;
  private user: User;

  constructor(
    private localData: LocalDataService,
    private fireStore: FireStoreService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.recipe = this.localData.getRandomRecipe();
    this.auth.user$.subscribe(user => this.user = user);
  }

  getTimeString(time: number): string {
    return RecipesViewComponent.getTimeString(time);
  }

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
}
