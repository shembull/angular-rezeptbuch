import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatTabsModule, MatToolbarModule} from '@angular/material';

const modules = [
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatTabsModule,
  MatListModule,
  MatIconModule,
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
