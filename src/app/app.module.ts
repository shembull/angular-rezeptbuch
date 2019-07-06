import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesViewComponent } from './recipes-view/recipes-view.component';
import {FirebaseModules} from './firebase-modules';
import {MaterialModules} from './material.modules';
import { ParallaxDirective } from './directives/parallax.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FabComponent } from './fab/fab.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatInputModule,
  MatSelectModule,
  MatStepperModule,
  MatTooltipModule
} from '@angular/material';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewIngredientDialogComponent } from './new-ingredient-dialog/new-ingredient-dialog.component';
import { RecipeSingeViewComponent } from './recipe-singe-view/recipe-singe-view.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
// tslint:disable-next-line:max-line-length
import { AddIngredientToShoppingListDialogComponent } from './add-ingredient-to-shopping-list-dialog/add-ingredient-to-shopping-list-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesViewComponent,
    ParallaxDirective,
    FabComponent,
    ShoppingListComponent,
    AddRecipeComponent,
    NewIngredientDialogComponent,
    RecipeSingeViewComponent,
    ToolbarComponent,
    AddIngredientToShoppingListDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FirebaseModules,
    MaterialModules,
    MatTooltipModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    MatInputModule,
    MatBadgeModule,
    MatSelectModule,

  ],
  entryComponents: [
    NewIngredientDialogComponent,
    AddIngredientToShoppingListDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
