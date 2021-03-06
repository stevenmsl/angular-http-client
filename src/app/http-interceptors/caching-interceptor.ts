import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, 
    HttpHeaders, HttpResponse } from '@angular/common/http';

import { RequestCache } from '../request-cache.service';
import { searchUrl } from '../package-search/package-search.service';
import { Observable, of } from 'rxjs';
import { tap, startWith } from 'rxjs/operators';


/**
 * If request is cachable (e.g., package search) and
 * response is in cache return the cached response as observable.
 * If has 'x-refresh' header that is true,
 * then also re-run the package search, using response from next(),
 * returning an observable that emits the cached response first.
 *
 * If not in cache or not cachable,
 * pass request through to next()
 */
@Injectable()
export class CachingInterceptor implements HttpInterceptor {
    constructor(private cache: RequestCache) {}    

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        //continue if cachable
        if (!isCachable(req)) { return next.handle(req);}

        const cachedResponse = this.cache.get(req);
        //cache-then-refresh
        if (req.headers.get('x-refresh')) {
            const results$ = sendRequest(req, next, this.cache); //update cache with the response received 
            /*
            The HttpClient.get() method normally returns an observable that either emits the data 
            or an error. Some folks describe it as a "one and done" observable.

            How to return a multi-valued Observable instead -
            returns an observable that immediately emits the cached response, sends the request to the NPM web API anyway, 
            and emits again later with the updated search results.
            
            pipe method is used for composing operators
            startWith – emit the given value first. So the cached response will be emitted first 
            */
            return cachedResponse ? 
                results$.pipe( startWith(cachedResponse)) :
                results$;            
        }
        //cache-or-fetch
        return cachedResponse ?
            of(cachedResponse) : sendRequest(req, next, this.cache);

    }
}

/** Is this request cachable? */
function isCachable(req: HttpRequest<any>) {
    // Only GET requests are cachable
    return req.method === 'GET' &&
        // Only npm package search is cachable in this app
        -1 < req.url.indexOf(searchUrl);
}

/*
Get server response observable by sending request to `next()`.
Will add the response to the cache on the way out.

*/
function sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCache): Observable<HttpEvent<any>> {
    
    //No headers allowed in npm search request
    const noHeaderReq = req.clone({ headers: new HttpHeaders()});

    return next.handle(noHeaderReq).pipe(
        tap(event => {
            //There may be other events besides the response
            if (event instanceof HttpResponse) {
                cache.put(req, event);    
            }
        })
    );
}