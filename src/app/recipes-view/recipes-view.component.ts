import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data-service.service';
import {FireStoreService} from '../services/fire-store.service';
import {Recipe} from '../interfaces/recipe';
import {AuthService} from '../services/auth.service';
import {User} from '../interfaces/user';

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
    ) { }

  async ngOnInit() {
    this.dataService.setToolBarTitle('Rezepte');
    (await this.fireStore.getRecipes()).subscribe(recipes => this.recipes = recipes);
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
  }

  getTimeString(time: number): string {
    const minutes = time % 60;
    const hour = (time - minutes) / 60;
    if (hour > 0) {
      return hour.toString().concat('h ', minutes.toString(), 'min');
    }
    return minutes.toString().concat('min');
  }

  log(item: any): void {
    console.log(item);
  }

  addToList(recipe: Recipe) {
    if (this.user) {
      this.fireStore.addItemToList(recipe.ingredients, recipe.amounts, this.user.shoppingList.id);
    } else {
      alert('Bitte log dich erst ein');
    }
  }
}
