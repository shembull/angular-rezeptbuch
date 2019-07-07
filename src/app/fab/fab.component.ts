import { Component, OnInit } from '@angular/core';
import {fabAnimations} from './fab.animations';
import {DataService} from '../services/data-service.service';
import {MatDialog} from '@angular/material';
// tslint:disable-next-line:max-line-length
import {AddIngredientToShoppingListDialogComponent} from '../add-ingredient-to-shopping-list-dialog/add-ingredient-to-shopping-list-dialog.component';
import {FireStoreService} from '../services/fire-store.service';
import {Ingredient} from '../interfaces/ingredient';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.css'],
  animations: fabAnimations
})
export class FabComponent implements OnInit {

  fabButtons = [
    {
      icon: 'playlist_add',
      hint: 'Zutat zur Einkaufsliste hinzufügen',
      link: '#',
      func: () => {
      const dialogRef = this.dialog.open(AddIngredientToShoppingListDialogComponent, {
        width: '300px'
      });
      dialogRef.afterClosed().subscribe(data => {
        const item: Ingredient[] = [];
        const amount: Map<string, number> = new Map<string, number>();
        item.push(data.ingredient);
        amount.set(data.title, data.amount);
        this.fs.addItemToList(item, amount);
      });
      },
    },
    {
      icon: 'note_add',
      hint: 'Neues Rezept hinzufügen',
      link: 'add_recipe',
      func: () => {
        console.log('Test');
      },
    },
  ];
  buttons = [];
  fabTogglerState = 'inactive';
  fabPositionShift: string;

  constructor(
    private dataService: DataService,
    private fs: FireStoreService,
    private dialog: MatDialog,
  ) { }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

  ngOnInit() {
    this.dataService.fabStatePaosition.subscribe(pos => {
      this.fabPositionShift = pos;
    });
  }

}
