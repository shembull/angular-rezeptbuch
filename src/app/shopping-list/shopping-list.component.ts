import {Component, OnInit} from '@angular/core';
import {shoppingListAnimation} from './shopping-list.animation';
import {DataService} from '../services/data-service.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: shoppingListAnimation,
})
export class ShoppingListComponent implements OnInit {

  listState: string;
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.shoppingListState.subscribe(
      state => this.listState = state
    );
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
