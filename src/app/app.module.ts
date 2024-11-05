// Angular Imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

// Project Imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './theme/shared/shared.module'; // Import your shared module

@NgModule({
  declarations: [
    AppComponent // Declare your main app component
  ],
  imports: [
    BrowserModule, // Browser module is required for all Angular apps
    AppRoutingModule, // Import your routing module
    SharedModule, // Import the shared module that contains Material and other components
    ReactiveFormsModule, // Import ReactiveFormsModule for reactive forms
  ],
  bootstrap: [AppComponent] // Bootstrap your main app component
})
export class AppModule {}
