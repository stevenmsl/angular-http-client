import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Config {
    heroesUrl: string;
    textfile: string;
}

@Injectable()
export class ConfigService {
    configUrl = 'assets/config.json';
    constructor(private http: HttpClient) {}

    getConfig() {
        return this.getConfig_1();        
    }

    getConfig_1() {
        return this.http.get(this.configUrl);
    }




}