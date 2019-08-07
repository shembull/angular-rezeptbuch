// Component to create a new recipe

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FireStoreService} from '../services/fire-store.service';
import {Ingredient} from '../interfaces/ingredient';
import {MatDialog} from '@angular/material';
import {NewIngredientDialogComponent} from '../new-ingredient-dialog/new-ingredient-dialog.component';
import uuid from 'uuid/v4';
import {RecipeFireStore} from '../interfaces/recipe-fire-store';
import {environment} from '../../environments/environment';
import {LocalDataService} from '../services/local-data.service';
import { Recipe } from '../interfaces/recipe';

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
    private localData: LocalDataService,
  ) {}

  ngOnInit() {
    this.isLinear = false;

    if (environment.offline) {
      this.localData.getIngredients().subscribe(ing => this.ingredients = ing);
    } else {
      // Get ingredients from Database
      this.fs.getIngredients().subscribe(ing => this.ingredients = ing);
    }

    // Define form validators
    this.titleFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required]
    });
    this.timeFormGroup = this.formBuilder.group({
      minuteCtrl: ['', Validators.pattern(/(^[\d]$)|(^[0-5]\d$)/g)],
      hourCtrl: ['', Validators.pattern(/^[\d]+/g)],
    });
    this.ingredientFormGroup = this.formBuilder.group({
      ingredientCtrl1: ['', Validators.required],
      amountCtrl1: ['', [Validators.required, Validators.pattern(/^[\d]+/g)]]
    });
    this.descFormGroup = this.formBuilder.group({
      description: ['', Validators.required]
    });
    this.urlFormGroup = this.formBuilder.group({
      url1: ['', Validators.required],
      url2: ['', Validators.required],
    });
  }

  // Create new form control if a new input field to add another ingredient; input fields are created based on the number of form groups
  addIngredientInput(): void {
    const id = uuid();
    this.ingredientFormGroup.addControl('ingredientCtrl' + id, new FormControl('', Validators.required));
    this.ingredientFormGroup.addControl('amountCtrl' + id, new FormControl('', Validators.required));
    this.ingredientFields.push({fromCtrlNameIng: 'ingredientCtrl' + id, formCtrlNameAmount: 'amountCtrl' + id});
  }

  // Convert input from form and send it to the db service
  saveRecipe(): void {
    const recipeTmp = {
      amounts: null,
      description: this.descFormGroup.getRawValue().description,
      id: '',
      ingredients: [],
      pictures: [this.urlFormGroup.getRawValue().url1, this.urlFormGroup.getRawValue().url2],
      time: Number(this.timeFormGroup.getRawValue().minuteCtrl) + Number(this.timeFormGroup.getRawValue().hourCtrl) * 60,
      title: this.titleFormGroup.getRawValue().nameCtrl
    };

    if (environment.offline) {
      // tslint:disable-next-line:prefer-const
      var recipe: Recipe = recipeTmp;
      recipe.amounts = new Map<string, number>();
    } else {
      // tslint:disable-next-line:prefer-const
      var recipeFS: RecipeFireStore = recipeTmp;
      recipeFS.amounts = {};
    }

    // Get values from input fields and convert them into the required datastructure for the database
    const ingredientKeys = Object.keys(this.ingredientFormGroup.getRawValue());
    ingredientKeys.forEach(val => {
      if (val.match(/^ing*/g) != null) {
        if (environment.offline) {
          recipe.amounts.set(this.ingredientFormGroup.getRawValue()[val], Number(this.ingredientFormGroup.getRawValue()['amountCtrl'.concat(val.substr(14, val.length - 1))]));
          this.ingredients.forEach(ingredient => {
            if (ingredient.title === this.ingredientFormGroup.getRawValue()[val]) {
              recipe.ingredients.push(ingredient);
              return;
            }
          });
        } else {
          const amount = this.ingredientFormGroup.getRawValue()['amountCtrl'.concat(val.substr(14, val.length - 1))];
          recipeFS.amounts[this.ingredientFormGroup.getRawValue()[val]] = amount.toString();
          this.ingredients.forEach(ingredient => {
            if (ingredient.title === this.ingredientFormGroup.getRawValue()[val]) {
              recipeFS.ingredients.push(this.fs.getIngredientDoc(ingredient.id));
              return;
            }
          });
        }
      }
    });
    if (environment.offline) {
      this.localData.addRecipe(recipe);
    } else {
      this.fs.addRecipe(recipeFS);
    }
  }

  // Open dialog if the ingredient for the recipe is not yet defined
  openDialog() {
    const dialogRef = this.dialog.open(NewIngredientDialogComponent, {
      width: '300px',
      data: {title: '', unit: '', category: ''}
    });

    dialogRef.afterClosed().subscribe( data => {
      if (environment.offline) {
        this.localData.addIngredient(data);
      } else {
        this.fs.addIngredient(data);
      }
    });
  }
}
