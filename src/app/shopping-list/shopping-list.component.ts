import {Component, OnInit} from '@angular/core';
import {shoppingListAnimation} from './shopping-list.animation';
import {DataService} from '../services/data-service.service';
import {ShoppingListStore} from '../interfaces/shopping-list-store';
import {FireStoreService} from '../services/fire-store.service';
import {AuthService} from '../services/auth.service';
import {User} from '../interfaces/user';
import {environment} from '../../environments/environment';
import {LocalDataService} from '../services/local-data.service';

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
    private localData: LocalDataService,
  ) {
    this.list = {amounts_cat: undefined, amounts_in: undefined, categories: [], items: [], unique_items: []};
  }

  async ngOnInit() {
    this.dataService.shoppingListState.subscribe(
      state => this.listState = state
    );
    if (environment.offline) {
      this.localData.localShoppingListObservable.subscribe(list => {
        this.list = list;
        this.fs.setBadgeCount(list.items.length);
      });
    } else {
      // subscribe to the logged in user
      // if user is logged in, get the shopping list of the user
      // update the local shopping list, if the list in the database changes
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
  }

  // invert the list state on call, thus hide or show it
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

  // show list on swipe action
  processSwipe(event) {
    if (event.overallVelocityX > 0 && event.pointerType !== 'mouse') {
      this.openCloseShoppingList();
    }
  }

  // enable touch devices to scroll... still buggy though
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
