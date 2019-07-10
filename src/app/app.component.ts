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

  // show list on swipe action
  openCloseList(event): void {
    if (event.overallVelocityX < 0) {
      this.ds.setShoppingListState('open');
      this.ds.setFabStatePosition(true);
      return;
    }
  }

  // enable touch devices to scroll... still buggy though
  scroll(event) {
    scrollBy({
      top: -15 * event.velocityY,
      left: 0,
      behavior: 'auto',
    });
  }
}
