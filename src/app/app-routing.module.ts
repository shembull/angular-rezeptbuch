import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipesViewComponent} from './recipes-view/recipes-view.component';

const routes: Routes = [
  {path: '', component: RecipesViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
