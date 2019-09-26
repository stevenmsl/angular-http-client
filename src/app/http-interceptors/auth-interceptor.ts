import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

/*
An interceptor that alters headers can be used for a number of different operations, including:
Authentication/authorization
Caching behavior; for example, If-Modified-Since
XSRF protection
*/

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
         // Get the auth token from the service.

        const authToken = this.auth.getAuthorizationToken();
        // Clone the request and set the new header in one step.
        const authReq = req.clone({ setHeaders: { Authorization: authToken }});
        console.log(authReq);        
        return next.handle(authReq);
    }
}