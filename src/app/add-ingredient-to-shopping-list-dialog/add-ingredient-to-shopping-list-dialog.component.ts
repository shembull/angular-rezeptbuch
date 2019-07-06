import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef} from '@angular/material';
import {FireStoreService} from '../services/fire-store.service';
import {Ingredient} from '../interfaces/ingredient';
import {DialogData} from '../interfaces/dialog-data';

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
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      amount: ['', Validators.required],
    });
    this.fs.getIngredients().subscribe(ing => {
      this.ingredients = ing;
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onClose(): DialogData {
    const data: DialogData = this.formGroup.getRawValue() as DialogData;
    this.ingredients.forEach(ing => {
      if (ing.title === data.title) {
        data.ingredient = ing;
      }
    });
    return data;
  }

}
