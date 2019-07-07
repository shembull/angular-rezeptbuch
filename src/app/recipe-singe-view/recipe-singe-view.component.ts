import { Component, OnInit } from '@angular/core';
import {Recipe} from '../interfaces/recipe';
import {FireStoreService} from '../services/fire-store.service';
import {DataService} from '../services/data-service.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Ingredient} from '../interfaces/ingredient';
import {AuthService} from '../services/auth.service';
import {User} from '../interfaces/user';

@Component({
  selector: 'app-recipe-singe-view',
  templateUrl: './recipe-singe-view.component.html',
  styleUrls: ['./recipe-singe-view.component.css']
})
export class RecipeSingeViewComponent implements OnInit {
  recipeId: string;
  recipe: Recipe = {
    amounts: undefined,
    id: '',
    title: '',
    time: 0,
    description: 'ljbljkb',
    pictures: ['', ''],
    ingredients: []
  };
  private user: User;

  constructor(
    private db: FireStoreService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.recipeId = param.id;
      this.db.getRecipe(this.recipeId).then( rec => {
        this.recipe = rec;
        this.dataService.setToolBarTitle(this.recipe.title);
      });
    });
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
  }

  addItemToList(ingredient: Ingredient, amount: number) {
    if (this.user) {
      const amounts: Map<string, number> = new Map<string, number>();
      const ingredients: Ingredient[] = [];
      amounts.set(ingredient.title, amount);
      ingredients.push(ingredient);
      this.db.addItemToList(ingredients, amounts, this.user.shoppingList.id);
    } else {
      alert('Bitte log dich erst ein');
    }
  }

}
