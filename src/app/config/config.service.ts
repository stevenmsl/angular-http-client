import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Config {
    heroesUrl: string;
    textfile: string;
}

/*
it's a best practice to separate presentation of data from data access 
by encapsulating data access in a separate service and delegating to 
that service in the component.
*/

@Injectable()
export class ConfigService {
    configUrl = 'assets/config.json';
    constructor(private http: HttpClient) {}

    getConfig() {
        return this.getConfig_2();
        //return this.getConfig_1();        
    }

    getConfig_1() {
        return this.http.get(this.configUrl);
    }

    getConfig_2() {
        //now returns an Observable of Config
        return this.http.get<Config>(this.configUrl);
    }

    getConfigResponse(): Observable<HttpResponse<Config>> {
        return this.http.get<Config>(
            this.configUrl, 
            { observe: 'response' }    
        )    
    }

}