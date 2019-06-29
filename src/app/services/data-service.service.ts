import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  get toolBarText(): Observable<string> {
    return this._toolBarText;
  }

  private toolBarTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  // tslint:disable-next-line:variable-name
  private _toolBarText: Observable<string> = this.toolBarTextSubject.asObservable();
  constructor() { }

  setToolBarTitle(title: string): void {
    this.toolBarTextSubject.next(title);
  }
}
