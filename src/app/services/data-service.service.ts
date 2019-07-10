import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  get fabStatePosition(): Observable<string> {
    return this._fabStatePosition;
  }
  get shoppingListState(): Observable<string> {
    return this._shoppingListState;
  }

  private shoppingListStateSubject: BehaviorSubject<string> = new BehaviorSubject<string>('closed');
  // tslint:disable-next-line:variable-name
  private _shoppingListState: Observable<string> = this.shoppingListStateSubject.asObservable();
  private fabStatePositionSubject: BehaviorSubject<string> = new BehaviorSubject<string>('rightShift');
  // tslint:disable-next-line:variable-name
  private _fabStatePosition: Observable<string> = this.fabStatePositionSubject.asObservable();
  constructor() { }

  // shopping list state setter; subscribe function of corresponding observable gets called on update
  setShoppingListState(state: string): void {
    return this.shoppingListStateSubject.next(state);
  }

  // fab state setter; subscribe function of corresponding observable gets called on update
  setFabStatePosition(position: boolean): void {
    if (position) {
      return this.fabStatePositionSubject.next('leftShift');
    } else {
      return this.fabStatePositionSubject.next('rightShift');
    }
  }
}
