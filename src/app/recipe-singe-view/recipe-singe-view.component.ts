import { Component, OnInit } from '@angular/core';
import {Recipe} from '../interfaces/recipe';
import {FireStoreService} from '../services/fire-store.service';
import {DataService} from '../services/data-service.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Ingredient} from '../interfaces/ingredient';

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

  constructor(
    private db: FireStoreService,
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.recipeId = param.id;
      this.db.getRecipe(this.recipeId).then( rec => {
        this.recipe = rec;
        this.dataService.setToolBarTitle(this.recipe.title);
      });
    });
  }

  addItemToList(ingredient: Ingredient, amount: number) {
    const amounts: Map<string, number> = new Map<string, number>();
    const ingredients: Ingredient[] = [];
    amounts.set(ingredient.title, amount);
    ingredients.push(ingredient);
    this.db.addItemToList(ingredients, amounts);
  }

}
