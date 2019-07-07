import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data-service.service';
import {FireStoreService} from '../services/fire-store.service';
import {AuthService} from '../services/auth.service';
import {User} from '../interfaces/user';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  shoppingListState: string;
  badgeCount: string;

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
      }
    );
  }

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
