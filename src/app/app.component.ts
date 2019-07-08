import {Component, OnInit} from '@angular/core';
import {DataService} from './services/data-service.service';
import {Time} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  scrollDelta = 0;
  constructor(
    private ds: DataService,
  ) {
  }
  ngOnInit(): void {
  }
  openCloseList(event): void {
    if (event.overallVelocityX < 0) {
      this.ds.setShoppingListState('open');
      this.ds.setFabStatePosition(true);
      return;
    }
  }

  scroll(event) {
    scrollBy({
      top: -15 * event.velocityY,
      left: 0,
      behavior: 'auto',
    });
  }


}
