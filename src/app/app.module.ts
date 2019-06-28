import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { AngularTokenModule } from 'angular-token';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './pages/admin/admin.module';
import { PagesModule } from './pages/pages.module';
import { environment } from '../environments/environment';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    HttpClientModule,
    AdminModule,
    AngularTokenModule.forRoot({
      apiBase: environment.apiBase,
    })
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
        disableClose: true,
        hasBackdrop: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
