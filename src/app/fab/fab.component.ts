import { Component, OnInit } from '@angular/core';
import {fabAnimations} from './fab.animations';
import {DataService} from '../services/data-service.service';
import {MatDialog} from '@angular/material';
// tslint:disable-next-line:max-line-length
import {AddIngredientToShoppingListDialogComponent} from '../add-ingredient-to-shopping-list-dialog/add-ingredient-to-shopping-list-dialog.component';
import {FireStoreService} from '../services/fire-store.service';
import {Ingredient} from '../interfaces/ingredient';
import {AuthService} from '../services/auth.service';
import {User} from '../interfaces/user';
import {environment} from '../../environments/environment';
import {LocalDataService} from '../services/local-data.service';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.css'],
  animations: fabAnimations
})
export class FabComponent implements OnInit {

  // define sub fabs for main fab
  fabButtons = [
    {
      icon: 'playlist_add',
      hint: 'Zutat zur Einkaufsliste hinzufügen',
      link: undefined,
      func: () => {
        if (this.user || environment.offline) {
          const dialogRef = this.dialog.open(AddIngredientToShoppingListDialogComponent, {
            width: '300px'
          });
          dialogRef.afterClosed().subscribe(data => {
            if (data) {
              const item: Ingredient[] = [];
              const amount: Map<string, number> = new Map<string, number>();
              item.push(data.ingredient);
              amount.set(data.title, data.amount);
              if (environment.offline) {
                this.localData.addItemToList(item, amount);
              } else {
                this.fs.addItemToList(item, amount, this.user.shoppingList.id);
              }
            }
          });
        } else {
          alert('Bitte log dich erst ein');
        }
      },
    },
    {
      icon: 'note_add',
      hint: 'Neues Rezept hinzufügen',
      link: 'add_recipe',
      func: () => {},
    },
  ];
  buttons = [];
  fabTogglerState = 'inactive';
  fabPositionShift: string;
  private user: User;

  constructor(
    private dataService: DataService,
    private fs: FireStoreService,
    private dialog: MatDialog,
    private auth: AuthService,
    private localData: LocalDataService,
  ) { }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  // change fab state to toggle animation
  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

  ngOnInit() {
    // subscribe to fab state
    this.dataService.fabStatePosition.subscribe(pos => {
      this.fabPositionShift = pos;
    });
    // subscribe to user
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
  }

}
