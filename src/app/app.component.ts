import {Component, OnInit} from '@angular/core';
import {DataService} from './services/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;
  shoppingListState: string;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.toolBarText.subscribe( text => this.title = text);
    this.dataService.shoppingListState.subscribe(
      state => this.shoppingListState = state
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
