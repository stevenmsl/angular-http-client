import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';

import { ConfigComponent } from './config/config.component';
import { MessagesComponent } from './messages/messages.component';
import { PackageSearchComponent } from './package-search/package-search.component';

import { HttpErrorHandler } from './http-error-handler.service';
import { httpInterceptorProviders } from './http-interceptors/index';
import { MessageService } from './message.service';
import { RequestCache, RequestCacheWithMap } from './request-cache.service';
import { UploaderComponent } from './uploader/uploader.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    MessagesComponent,
    UploaderComponent,
    PackageSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    //import HttpClientModule after BrowserModule 
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header'
    }),
  
  ],
  providers: [
    AuthService,
    HttpErrorHandler,
    MessageService,
    //RequestCache is a abstract class 
    { provide: RequestCache, useClass: RequestCacheWithMap},
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
