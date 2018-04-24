import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routhing.module';
import { HttpModule } from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SearchOffersComponent } from './search-offers/search-offers.component';

import { AppConfig } from './app.config';
import { HttpClient } from './utils/http-client';
import { AuthGuard } from './utils/authentication.guard';
import { CredentialsStorage } from './utils/credentials-storage';

import { AuthenticationService } from './services/authentication.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchOffersComponent
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, HttpModule, NgxDatatableModule, MatProgressSpinnerModule, MatIconModule
  ],
  providers: [AppConfig, HttpClient, AuthGuard, CredentialsStorage, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
