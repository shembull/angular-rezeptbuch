// Dialog to add an ingredient to the shoppinglist

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FireStoreService} from '../services/fire-store.service';
import {Ingredient} from '../interfaces/ingredient';
import {DialogData} from '../interfaces/dialog-data';
import {NewIngredientDialogComponent} from '../new-ingredient-dialog/new-ingredient-dialog.component';

@Component({
  selector: 'app-add-ingredient-to-shopping-list-dialog',
  templateUrl: './add-ingredient-to-shopping-list-dialog.component.html',
  styleUrls: ['./add-ingredient-to-shopping-list-dialog.component.css']
})
export class AddIngredientToShoppingListDialogComponent implements OnInit {
  formGroup: FormGroup;
  ingredients: Ingredient[];

  constructor(
    public dialogRef: MatDialogRef<AddIngredientToShoppingListDialogComponent>,
    private formBuilder: FormBuilder,
    private fs: FireStoreService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    // FormGroup for input validation
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      amount: ['', Validators.required],
    });

    // Retrieving of defined ingredients and updating those on change
    this.fs.getIngredients().subscribe(ing => {
      this.ingredients = ing;
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  // Send dialogdata back to calling component
  onClose(): DialogData {
    // Get data from input fields
    const data: DialogData = this.formGroup.getRawValue() as DialogData;

    // Find selected ingredient out of ingredient-array
    if (this.ingredients) {
      this.ingredients.forEach(ing => {
        if (ing.title === data.title) {
          data.ingredient = ing;
        }
      });
      return data;
    }
  }

  // Open dialog to create new ingredient
  openDialog() {
    const dialogRef = this.dialog.open(NewIngredientDialogComponent, {
      width: '300px',
      data: {title: '', unit: '', category: ''}
    });

    // Create new ingredient out of input data
    dialogRef.afterClosed().subscribe( res => {
      this.fs.addIngredient(res);
    });
  }

}
