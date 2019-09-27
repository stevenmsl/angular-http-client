import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';


@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
    constructor(private messenger: MessageService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler ) {
        const started = Date.now();
        let ok: string;
        return next.handle(req)
            .pipe(
                tap(
                    //succeeds when there is a response; ignore other events
                    event => ok = event instanceof HttpResponse ? 'succeeded': '',
                    //Operation failed; error is an HttpErrorResponse
                    error => ok = 'failed'
                ),
                //log when response observable either completes or errors
                finalize(() => {

                    const elpased = Date.now() - started;
                    const msg = `${req.method} "${req.urlWithParams}"
                     ${ok} in ${elpased} ms.`;
                    this.messenger.add(msg);
                })

            );

    }    
}
