import {Component, OnInit} from '@angular/core';
import {DataService} from './services/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private ds: DataService,
  ) {
  }
  ngOnInit(): void {
  }
  openCloseList(event): void {
    if (event.overallVelocityX < 0) {
      this.ds.setShoppingListState('open');
    }
  }
}
