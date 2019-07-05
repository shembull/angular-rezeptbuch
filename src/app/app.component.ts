import {Component, OnInit} from '@angular/core';
import {DataService} from './services/data-service.service';
import {FireStoreService} from './services/fire-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;
  shoppingListState: string;
  badgeCount: string;

  constructor(
    private dataService: DataService,
    private fireStore: FireStoreService,
    ) { }

  ngOnInit(): void {
    this.dataService.toolBarText.subscribe( text => this.title = text);
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
