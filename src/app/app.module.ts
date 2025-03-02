// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'; // Add this line

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './theme/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { NavLeftComponent } from './theme/layouts/admin-layout/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './theme/layouts/admin-layout/nav-bar/nav-right/nav-right.component';
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';

@NgModule({
  declarations: [AppComponent,],
  imports: [BrowserModule, AppRoutingModule, SharedModule, BrowserAnimationsModule, ReactiveFormsModule, HttpClientModule,AdminComponent],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
