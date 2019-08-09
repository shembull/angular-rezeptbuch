import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipesViewComponent} from './recipes-view/recipes-view.component';
import {AddRecipeComponent} from './add-recipe/add-recipe.component';
import {RecipeSingeViewComponent} from './recipe-singe-view/recipe-singe-view.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: RecipesViewComponent},
  {path: 'add_recipe', component: AddRecipeComponent},
  {path: 'recipe/:id', component: RecipeSingeViewComponent},
  {path: 'error-404', component: PageNotFoundComponent},
  {path: '**', redirectTo: 'error-404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
