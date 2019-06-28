import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesViewComponent } from './recipes-view/recipes-view.component';
import {FirebaseModules} from './firebase-modules';
import {MaterialModules} from './material.modules';

@NgModule({
  declarations: [
    AppComponent,
    RecipesViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FirebaseModules,
    MaterialModules,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
