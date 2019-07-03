import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FireStoreService} from '../services/fire-store.service';
import {Ingredient} from '../interfaces/ingredient';
import {MatDialog} from '@angular/material';
import {NewIngredientDialogComponent} from '../new-ingredient-dialog/new-ingredient-dialog.component';
import uuid from 'uuid/v4';
import {DialogData} from '../interfaces/dialog-data';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  ingredientFields = [{
    fromCtrlNameIng: 'ingredientCtrl',
    formCtrlNameAmount: 'amountCtrl'
  }];

  ingredients: Ingredient[];
  isLinear: boolean;
  thourthFormGroup: FormGroup;
  fithFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private fs: FireStoreService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.isLinear = false;
    this.fs.getIngredients().subscribe(ing => this.ingredients = ing);

    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      minuteCtrl: ['', Validators.pattern(/\d|[[0-5]\d]/g)],
      hourCtrl: ['', Validators.pattern(/\d/g)],
    });
    this.thirdFormGroup = this.formBuilder.group({
      ingredientCtrl: ['', Validators.required],
      amountCtrl: ['', Validators.required]
    });
    this.thourthFormGroup = this.formBuilder.group({
      description: ['', Validators.required]
    });
    this.fithFormGroup = this.formBuilder.group({
      url1: ['', Validators.required],
      url2: ['', Validators.required],
    });
  }

  addIngredientInput(): void {
    const id = uuid();
    this.thirdFormGroup.addControl('ingredientCtrl' + id, new FormControl('', Validators.required));
    this.thirdFormGroup.addControl('amountCtrl' + id, new FormControl('', Validators.required));
    this.ingredientFields.push({fromCtrlNameIng: 'ingredientCtrl' + id, formCtrlNameAmount: 'amountCtrl' + id});
    console.log(this.thirdFormGroup);
  }

  saveRecipe(): void {
    this.firstFormGroup.getRawValue();
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewIngredientDialogComponent, {
      width: '300px',
      data: {title: '', unit: '', category: ''}
    });

    dialogRef.afterClosed().subscribe( res => {
      this.fs.addIngredient(res);
    });
  }
}
