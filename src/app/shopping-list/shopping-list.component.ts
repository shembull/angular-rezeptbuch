import {Component, OnInit} from '@angular/core';
import {shoppingListAnimation} from './shopping-list.animation';
import {DataService} from '../services/data-service.service';
import {ShoppingListStore} from '../interfaces/shopping-list-store';
import {FireStoreService} from '../services/fire-store.service';

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
    private dataService: DataService,
    private fs: FireStoreService,
  ) { }

  async ngOnInit() {
    this.dataService.shoppingListState.subscribe(
      state => this.listState = state
    );
    this.fs.getListObservable().subscribe(fireList => {
      this.fs.getShoppingList().then(list => {
        this.list = list;
      });
      this.fs.setBadgeCount(fireList.items.length);
    });
    /*
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
  */
  }

  openCloseShoppingList(): void {
    if (this.listState === 'closed') {
      this.dataService.setShoppingListState('open');
      this.dataService.setFabStatePosition(true);
      return;
    }
    this.dataService.setShoppingListState('closed');
    this.dataService.setFabStatePosition(false);
    return;
  }

  processSwipe(event) {
    if (event.overallVelocityX > 0 && event.pointerType !== 'mouse') {
      this.openCloseShoppingList();
    }
  }
}
