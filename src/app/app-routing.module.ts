import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipesViewComponent} from './recipes-view/recipes-view.component';
import {SingleViewComponent} from './single-view/single-view.component';

const routes: Routes = [
  {path: '', component: RecipesViewComponent},
  {path: 'recipe/:id', component: SingleViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
