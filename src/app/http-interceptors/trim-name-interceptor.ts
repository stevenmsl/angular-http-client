import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

/*
HttpRequest and HttpResponse instance properties are readonly, rendering them largely immutable.
They are immutable for a good reason: the app may retry a request several times before it succeeds, 
which means that the interceptor chain may re-process the same request multiple times. 
*/

@Injectable() 
export class TrimNameInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        const body = req.body;
        if (!body || !body.name) {
            console.log(req);
            return next.handle(req);
        }
        // copy the body and trim whitespace from the name property
        const newBody = {...body, name: body.name.trim()};
        // clone request and set its body
        const newReq = req.clone({body: newBody});
        // send the cloned request to the next handler.
        console.log(newReq);
        return next.handle(newReq);
    }    
}