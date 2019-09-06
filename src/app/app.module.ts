import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ConfigComponent } from './config/config.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //import HttpClientModule after BrowserModule 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
