import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data-service.service';
import {Recipe} from '../interfaces/recipe';
import {FireStoreService} from '../services/fire-store.service';

@Component({
  selector: 'app-recipes-view',
  templateUrl: './recipes-view.component.html',
  styleUrls: ['./recipes-view.component.css']
})
export class RecipesViewComponent implements OnInit {

  recipes: Recipe[];

  constructor(
    private dataService: DataService,
    private fireStore: FireStoreService,
    ) { }

  ngOnInit() {
    this.dataService.setToolBarTitle('Rezepte');
    this.fireStore.getRecipes().subscribe(recipes => this.recipes = recipes);
  }

  getTimeString(time: number): string {
    const minutes = time % 60;
    const hour = (time - minutes) / 60;
    if (hour > 0) {
      return hour.toString().concat('h ', minutes.toString(), 'min');
    }
    return minutes.toString().concat('min');
  }

}
