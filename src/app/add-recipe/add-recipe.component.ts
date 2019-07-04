import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FireStoreService} from '../services/fire-store.service';
import {Ingredient} from '../interfaces/ingredient';
import {MatDialog} from '@angular/material';
import {NewIngredientDialogComponent} from '../new-ingredient-dialog/new-ingredient-dialog.component';
import uuid from 'uuid/v4';
import {RecipeFireStore} from '../interfaces/recipe-fire-store';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  titleFormGroup: FormGroup;
  timeFormGroup: FormGroup;
  ingredientFormGroup: FormGroup;
  ingredientFields = [{
    fromCtrlNameIng: 'ingredientCtrl1',
    formCtrlNameAmount: 'amountCtrl1'
  }];

  ingredients: Ingredient[];
  isLinear: boolean;
  descFormGroup: FormGroup;
  urlFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private fs: FireStoreService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.isLinear = false;
    this.fs.getIngredients().subscribe(ing => this.ingredients = ing);

    this.titleFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required]
    });
    this.timeFormGroup = this.formBuilder.group({
      minuteCtrl: ['', Validators.pattern(/\d|[[0-5]\d]/g)],
      hourCtrl: ['', Validators.pattern(/\d/g)],
    });
    this.ingredientFormGroup = this.formBuilder.group({
      ingredientCtrl1: ['', Validators.required],
      amountCtrl1: ['', Validators.required]
    });
    this.descFormGroup = this.formBuilder.group({
      description: ['', Validators.required]
    });
    this.urlFormGroup = this.formBuilder.group({
      url1: ['', Validators.required],
      url2: ['', Validators.required],
    });
  }

  addIngredientInput(): void {
    const id = uuid();
    this.ingredientFormGroup.addControl('ingredientCtrl' + id, new FormControl('', Validators.required));
    this.ingredientFormGroup.addControl('amountCtrl' + id, new FormControl('', Validators.required));
    this.ingredientFields.push({fromCtrlNameIng: 'ingredientCtrl' + id, formCtrlNameAmount: 'amountCtrl' + id});
    console.log(this.ingredientFormGroup);
  }

  saveRecipe(): void {
    const recipe: RecipeFireStore = {
      amounts: {},
      description: this.descFormGroup.getRawValue().description,
      id: '',
      ingredients: [],
      pictures: [this.urlFormGroup.getRawValue().url1, this.urlFormGroup.getRawValue().url2],
      time: Number(this.timeFormGroup.getRawValue().minuteCtrl) + Number(this.timeFormGroup.getRawValue().hourCtrl) * 60,
      title: this.titleFormGroup.getRawValue().nameCtrl
    };
    const ingredientKeys = Object.keys(this.ingredientFormGroup.getRawValue());
    ingredientKeys.forEach(val => {
      if (val.match(/^ing*/g) != null) {
        const amount = this.ingredientFormGroup.getRawValue()['amountCtrl'.concat(val.substr(14, val.length - 1))];
        recipe.amounts[this.ingredientFormGroup.getRawValue()[val]] = amount.toString();
        this.ingredients.forEach(ingredient => {
          if (ingredient.title === this.ingredientFormGroup.getRawValue()[val]) {
            recipe.ingredients.push(this.fs.getIngredientDoc(ingredient.id));
            return;
          }
        });
      }
    });
    this.fs.addRecipe(recipe);
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
