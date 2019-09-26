import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
    /*
        the intercept method transforms a request into an Observable that eventually returns the HTTP response
    */
    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        console.log(req);
        /*
        the handle method transforms an HTTP request into an Observable of HttpEvents which ultimately include the server's response.
        */
       /*
        The next object represents the next interceptor in the chain of interceptors.
        The final next in the chain is the HttpClient backend handler that sends the 
        request to the server and receives the server's response.
       */
        return next.handle(req);
    }    
}
