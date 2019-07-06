import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../interfaces/dialog-data';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-ingredient-dialog',
  templateUrl: './new-ingredient-dialog.component.html',
  styleUrls: ['./new-ingredient-dialog.component.css']
})
export class NewIngredientDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewIngredientDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      unit: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onClose(): DialogData {
    this.data = {
      category: this.formGroup.controls.category.value,
      title: this.formGroup.controls.title.value,
      unit: this.formGroup.controls.unit.value
    };
    return this.data;
  }
}
