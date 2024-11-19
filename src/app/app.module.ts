// Angular Imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

// Project Imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './theme/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './theme/layouts/admin-layout/nav-bar/nav-bar.component';
import { NavigationComponent } from './theme/layouts/admin-layout/navigation/navigation.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,NavBarComponent,NavigationComponent, AppRoutingModule, SharedModule, BrowserAnimationsModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
