import {Component, OnInit} from '@angular/core';
import {shoppingListAnimation} from './shopping-list.animation';
import {DataService} from '../services/data-service.service';
import {Ingredient} from '../interfaces/ingredient';
import {ShoppingListStore} from '../interfaces/shopping-list-store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: shoppingListAnimation,
})
export class ShoppingListComponent implements OnInit {

  listState: string;
  list: ShoppingListStore;
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.shoppingListState.subscribe(
      state => this.listState = state
    );
    this.dataService.shoppingList.subscribe(
      list => {
        this.list = list;
      }
    );
    for (let i = 0; i < 12; i++) {
      this.dataService.updateShoppingList({category: 'Gemüse', id: 'öljn', title: 'Kartoffel', unit: 'g', origin: undefined}, true, 300);
    }
    this.dataService.updateShoppingList({category: 'Obst', id: 'öljn', title: 'Apfel', unit: 'g', origin: undefined}, true, 1234);
    this.dataService.updateShoppingList({category: 'Gemüse', id: 'öljn', title: 'Brokkoli', unit: 'g', origin: undefined}, true, 500);
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
