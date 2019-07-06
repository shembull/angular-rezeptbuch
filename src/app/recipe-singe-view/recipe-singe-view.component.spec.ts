import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSingeViewComponent } from './recipe-singe-view.component';

describe('RecipeSingeViewComponent', () => {
  let component: RecipeSingeViewComponent;
  let fixture: ComponentFixture<RecipeSingeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeSingeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeSingeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
