import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

//Declare a function type
/*
An instance of this function type is a function that takes two parameters (operation, result) 
and returns another function. 
The returned function takes one parameter with return type of Observable<T>   
*/
export type HandleError = 
    <T> (operation?: string, result?:T) 
    => (error: HttpErrorResponse) => Observable<T>;

@Injectable()
export class HttpErrorHandler {
    constructor(private messageService: MessageService) {        
    }
    /* Create curried handleError function that already knows the service name */
    createHandleError = (servicename = '') => <T>
        (operation = 'operation', result = {} as T ) => this.handleError(
            servicename, operation, result);

    handleError<T> (serviceName = '', operation = 'operation', result = {} as T ) {
        return (error: HttpErrorResponse): Observable<T> => {
            console.error(error);

            const message = (error.error instanceof ErrorEvent) ? 
                error.error.message : 
                `server returned code ${error.status} with body "${error.error}"`;

            this.messageService.add(`${serviceName}: ${operation} failed: ${message}`);
            
            // Let the app keep running by returning a safe result.
            // Use a mocked response without creating any real backend
            return of(result);
        }; 
    }

}