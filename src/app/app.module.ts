import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";
import { HttpClientXsrfModule } from "@angular/common/http";

import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthService } from "./auth.service";

import { ConfigComponent } from "./config/config.component";
import { MessagesComponent } from "./messages/messages.component";
import { PackageSearchComponent } from "./package-search/package-search.component";

import { HttpErrorHandler } from "./http-error-handler.service";
import { httpInterceptorProviders } from "./http-interceptors/index";
import { MessageService } from "./message.service";
import { RequestCache, RequestCacheWithMap } from "./request-cache.service";
import { UploaderComponent } from "./uploader/uploader.component";
import { HeroesComponent } from "./heroes/heroes.component";
import { InMemoryDataService } from "./in-memory-data.service";

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    HeroesComponent,
    MessagesComponent,
    UploaderComponent,
    PackageSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    //import HttpClientModule after BrowserModule; need to find out why
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: "My-Xsrf-Cookie",
      headerName: "My-Xsrf-Header"
    }),

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true,
      put204: false //return entity
    })
  ],
  providers: [
    AuthService,
    HttpErrorHandler,
    MessageService,
    //RequestCache is a abstract class
    { provide: RequestCache, useClass: RequestCacheWithMap },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
