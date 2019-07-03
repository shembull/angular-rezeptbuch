import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesViewComponent } from './recipes-view/recipes-view.component';
import {FirebaseModules} from './firebase-modules';
import {MaterialModules} from './material.modules';
import { SingleViewComponent } from './single-view/single-view.component';
import { ParallaxDirective } from './directives/parallax.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FabComponent } from './fab/fab.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatStepperModule, MatTooltipModule} from '@angular/material';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewIngredientDialogComponent } from './new-ingredient-dialog/new-ingredient-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesViewComponent,
    SingleViewComponent,
    ParallaxDirective,
    FabComponent,
    ShoppingListComponent,
    AddRecipeComponent,
    NewIngredientDialogComponent
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

  ],
  entryComponents: [
    NewIngredientDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
