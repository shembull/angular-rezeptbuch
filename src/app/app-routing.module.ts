import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipesViewComponent} from './recipes-view/recipes-view.component';
import {SingleViewComponent} from './single-view/single-view.component';
import {AddRecipeComponent} from './add-recipe/add-recipe.component';

const routes: Routes = [
  {path: '', component: RecipesViewComponent},
  {path: 'recipe/:id', component: SingleViewComponent},
  {path: 'add_recipe', component: AddRecipeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
