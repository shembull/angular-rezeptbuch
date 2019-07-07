import {Component, OnInit} from '@angular/core';
import {shoppingListAnimation} from './shopping-list.animation';
import {DataService} from '../services/data-service.service';
import {ShoppingListStore} from '../interfaces/shopping-list-store';
import {FireStoreService} from '../services/fire-store.service';
import {AuthService} from '../services/auth.service';
import {User} from '../interfaces/user';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: shoppingListAnimation,
})
export class ShoppingListComponent implements OnInit {

  listState: string;
  list: ShoppingListStore;
  user: User;
  constructor(
    private dataService: DataService,
    private fs: FireStoreService,
    private auth: AuthService,
  ) { }

  async ngOnInit() {
    this.dataService.shoppingListState.subscribe(
      state => this.listState = state
    );
    this.auth.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.fs.getListObservable(user.shoppingList.id).subscribe(fireList => {
          this.fs.getShoppingList(user.shoppingList.id).then(list => {
            this.list = list;
          });
          this.fs.setBadgeCount(fireList.items.length);
        });
      } else {
        this.list = {amounts_cat: undefined, amounts_in: undefined, categories: [], items: [], unique_items: []};
      }
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
