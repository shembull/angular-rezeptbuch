import {Component, OnInit} from '@angular/core';
import {shoppingListAnimation} from './shopping-list.animation';
import {DataService} from '../services/data-service.service';
import {ShoppingListStore} from '../interfaces/shopping-list-store';
import {FireStoreService} from '../services/fire-store.service';
import {AuthService} from '../services/auth.service';
import {User} from '../interfaces/user';
import {element} from 'protractor';

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
  loading: boolean;
  constructor(
    private dataService: DataService,
    private fs: FireStoreService,
    public auth: AuthService,
  ) {
    this.list = {amounts_cat: undefined, amounts_in: undefined, categories: [], items: [], unique_items: []};
  }

  async ngOnInit() {
    this.dataService.shoppingListState.subscribe(
      state => this.listState = state
    );
    this.auth.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.fs.getListObservable(user.shoppingList.id).subscribe(fireList => {
          this.loading = true;
          this.fs.getShoppingList(user.shoppingList.id).then(list => {
            this.list = list;
            this.loading = false;
          });
          this.fs.setBadgeCount(fireList.items.length);
        });
      } else {
        this.list = {amounts_cat: undefined, amounts_in: undefined, categories: [], items: [], unique_items: []};
      }
    });
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

  scroll(event) {
    event.srcEvent.path.forEach( el => {
      if (el.className === 'content ng-trigger ng-trigger-openClose') {
        el.scrollBy({
          top: -15 * event.velocityY,
          left: 0,
          behavior: 'auto',
        });
      }
    });
  }
}
