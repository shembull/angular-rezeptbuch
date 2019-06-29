import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatToolbarModule} from '@angular/material';

const modules = [
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
];

@NgModule({
  imports: [
    modules
  ],
  exports: [
    modules
  ]
})
export class MaterialModules { }
