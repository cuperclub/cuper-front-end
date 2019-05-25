import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { AngularTokenModule } from 'angular-token';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PagesModule } from './pages/pages.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    HttpClientModule,
    AngularTokenModule.forRoot({
      apiBase: environment.apiBase,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
