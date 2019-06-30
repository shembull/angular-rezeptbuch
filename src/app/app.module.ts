import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesViewComponent } from './recipes-view/recipes-view.component';
import {FirebaseModules} from './firebase-modules';
import {MaterialModules} from './material.modules';
import { SingleViewComponent } from './single-view/single-view.component';
import { ParallaxDirective } from './directives/parallax.directive';
import {MatIconModule, MatListModule, MatTabsModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FabComponent } from './fab/fab.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesViewComponent,
    SingleViewComponent,
    ParallaxDirective,
    FabComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FirebaseModules,
    MaterialModules,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
