import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../message.service';
import { of } from 'rxjs';
import { map, tap, last, catchError } from 'rxjs/operators';

@Injectable()
export class UploaderService {
    constructor (
        private http: HttpClient,
        private messenger: MessageService
    ) {}

    upload(file: File) {
        if (!file) { return; }

        // Create the request object that POSTs the file to an upload endpoint.
        // The `reportProgress` option tells HttpClient to listen and return
        // XHR (XMLHttpRequest) progress events.
        /*
           Every progress event triggers change detection, 
           so only turn them on if you truly intend to report progress in the UI.
        */
        const req = new HttpRequest
            ('POST', '/upload/file', file, {reportProgress: true});

        /*
          The `HttpClient.request` API produces a raw event stream
          which includes start (sent), progress, and response events.
        */
        return this.http.request(req).pipe(
            //map: apply projection with each value from source
            map(event => this.getEventMessage(event, file)),
            tap(message => this.showProgress(message)),
            //last: emit the last value emitted from source on completion, based on provided expression.
            last(),
            catchError(this.handleError(file))
        );
        
    }

    /** Return distinct message for sent, upload progress, & response events */
    private getEventMessage(event: HttpEvent<any>, file: File) {
        switch (event.type) {
            case HttpEventType.Sent:
                return `Uploading file "${file.name}" of size ${file.size}.`;
            case HttpEventType.UploadProgress:
                // compute and show the % done
                const percentDone = Math.round(100 * event.loaded / event.total);
                return `File "${file.name}" is ${percentDone}% uploaded.`;
            case HttpEventType.Response:
                return `File "${file.name}" was completely uploaded!`;
            default:
                return `File "${file.name}" surprising upload event: ${event.type}.`;        
        }        
    }

   /**
   * Returns a function that handles Http upload failures.
   * @param file - File object for file being uploaded
   *
   * When no `UploadInterceptor` and no server,
   * you'll end up here in the error handler.
   */

   private handleError(file: File) {
        const userMessage = `${file.name} upload failed.`;

        return (error: HttpErrorResponse) => {
            console.error(error);

            const message = (error.error instanceof Error) ? 
                error.error.message:
                `server returned code ${error.status} with body "${error.error}"`;
            this.messenger.add(`${userMessage} ${message}`);

            //Let app keep running but indicate failure.
            return of(userMessage);
        };
   }

   private showProgress(message: string)  {
       this.messenger.add(message);       
   }


}