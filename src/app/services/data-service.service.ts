import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  get shoppingListState(): Observable<string> {
    return this._shoppingListState;
  }
  get toolBarText(): Observable<string> {
    return this._toolBarText;
  }

  private toolBarTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  // tslint:disable-next-line:variable-name
  private _toolBarText: Observable<string> = this.toolBarTextSubject.asObservable();
  private shoppingListStateSubject: BehaviorSubject<string> = new BehaviorSubject<string>('closed');
  // tslint:disable-next-line:variable-name
  private _shoppingListState: Observable<string> = this.shoppingListStateSubject.asObservable();
  constructor() { }

  setToolBarTitle(title: string): void {
    this.toolBarTextSubject.next(title);
  }
  setShoppingListState(state: string): void {
    this.shoppingListStateSubject.next(state);
  }
}
