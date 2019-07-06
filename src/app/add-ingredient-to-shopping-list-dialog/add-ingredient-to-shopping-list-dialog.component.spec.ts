import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIngredientToShoppingListDialogComponent } from './add-ingredient-to-shopping-list-dialog.component';

describe('AddIngredientToShoppingListDialogComponent', () => {
  let component: AddIngredientToShoppingListDialogComponent;
  let fixture: ComponentFixture<AddIngredientToShoppingListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIngredientToShoppingListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIngredientToShoppingListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
