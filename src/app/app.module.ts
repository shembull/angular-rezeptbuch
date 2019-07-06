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
import {MatAutocompleteModule, MatBadgeModule, MatInputModule, MatStepperModule, MatTooltipModule} from '@angular/material';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewIngredientDialogComponent } from './new-ingredient-dialog/new-ingredient-dialog.component';
import { RecipeSingeViewComponent } from './recipe-singe-view/recipe-singe-view.component';

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

  ],
  entryComponents: [
    NewIngredientDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
