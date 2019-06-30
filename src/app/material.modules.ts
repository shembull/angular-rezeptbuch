import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatListModule, MatTabsModule, MatToolbarModule} from '@angular/material';

const modules = [
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatTabsModule,
  MatListModule,
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
