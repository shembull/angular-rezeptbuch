import {Component, OnInit} from '@angular/core';
import {FireStoreService} from '../services/fire-store.service';
import {ActivatedRoute, Params} from '@angular/router';
import {DataService} from '../services/data-service.service';
import {Recipe} from '../interfaces/recipe';
import {Ingredient} from '../interfaces/ingredient';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.css']
})
export class SingleViewComponent implements OnInit {

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
