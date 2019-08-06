import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data-service.service';
import {FireStoreService} from '../services/fire-store.service';
import {AuthService} from '../services/auth.service';
import {toolbarAnimation} from './toolbar.animation';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  animations: toolbarAnimation
})
export class ToolbarComponent implements OnInit {

  shoppingListState: string;
  badgeCount: string;
  iconState = 'added';
  offlineUse: boolean = environment.offline;

  constructor(
    private dataService: DataService,
    private fireStore: FireStoreService,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.dataService.shoppingListState.subscribe(
      state => this.shoppingListState = state
    );
    this.fireStore.badgeCount.subscribe(
      count => {
        this.badgeCount = count.toString();
        if (this.iconState === 'added') {
          this.iconState = 'added2';
        } else {
          this.iconState = 'added';
        }
      }
    );
  }

  // show list on swipe action
  openCloseShoppingList(): void {
    if (this.shoppingListState === 'closed') {
      this.dataService.setShoppingListState('open');
      this.dataService.setFabStatePosition(true);
      return;
    }
    this.dataService.setShoppingListState('closed');
    this.dataService.setFabStatePosition(false);
    return;
  }
}
