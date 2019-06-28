import {Component, OnInit} from '@angular/core';
import {DataService} from './services/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.toolBarText.subscribe( text => this.title = text);
  }
}
