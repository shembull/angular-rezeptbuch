import { Component, OnInit } from '@angular/core';
import {fabAnimations} from './fab.animations';
import {DataService} from '../services/data-service.service';

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
    },
    {
      icon: 'note_add',
      hint: 'Neues Rezept hinzufügen',
      link: 'add_recipe',
    },
  ];
  buttons = [];
  fabTogglerState = 'inactive';
  fabPositionShift: string;

  constructor(
    private dataService: DataService,
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
