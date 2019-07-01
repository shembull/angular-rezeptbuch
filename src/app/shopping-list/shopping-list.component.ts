import {Component, OnInit} from '@angular/core';
import {shoppingListAnimation} from './shopping-list.animation';
import {DataService} from '../services/data-service.service';
import {Ingredient} from '../interfaces/ingredient';
import {CategoryStore} from '../interfaces/category-store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: shoppingListAnimation,
})
export class ShoppingListComponent implements OnInit {

  listState: string;
  list: Ingredient[];
  categories: CategoryStore;
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.shoppingListState.subscribe(
      state => this.listState = state
    );
    this.dataService.shoppingList.subscribe(
      list => this.list = list
    );
    this.dataService.categories.subscribe(
      categories => this.categories = categories
    );
    for (let i = 0; i < 10; i++) {
      this.dataService.updateShoppingList({category: 'Gemüse', id: 'öljn', title: 'Kartoffel', unit: 'kg'}, true);
    }
    this.dataService.updateShoppingList({category: 'Obst', id: 'öljn', title: 'Apfel', unit: 'kg'}, true);
  }

  openCloseShoppingList(): void {
    if (this.listState === 'closed') {
      this.dataService.setShoppingListState('open');
      return;
    }
    this.dataService.setShoppingListState('closed');
    return;
  }

}
