import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface NpmPackageInfo {
    name: string;
    version: string;
    description: string;
}

export const searchUrl = 'https://npmsearch.com/query';

const httpOptions = {
    headers: new HttpHeaders({
        'x-refresh': 'true'
    })
};

function createHttpOptions(packageName: string, refresh = false) {
    // npm package name search api
    // e.g., http://npmsearch.com/query?q=dom'
    const params = new HttpParams({
        fromObject: { q: packageName} });
    const headerMap = refresh ? {'x-refresh': 'true'} : {};
    const headers = new HttpHeaders(headerMap);
    return { headers, params}
}

@Injectable() 
export class PackageSearchService {
    private handleError: HandleError;

    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandler) {
        this.handleError = 
            httpErrorHandler.createHandleError('HeroesService');
    }

    search (packageName: string, refresh = false) : Observable<NpmPackageInfo[]> {
        if (!packageName.trim()) { return of([]); }

        const options = createHttpOptions(packageName, refresh);

        return this.http.get(searchUrl, options).pipe(

            map((data: any) => {
                return data.results.map(
                    (entry: any) => ({
                        name: entry.name[0],
                        version: entry.version[0],
                        description: entry.description[0]
                    } as NpmPackageInfo )
                );
            }),
            catchError(this.handleError('search', []))

        );
        
    }

}