import { Store } from '@ngrx/store';
import { AlertService } from 'src/app/core/services/alert/alert-service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as fromCustomer from '../../../customers/store';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private alertService: AlertService,
                private store: Store<fromCustomer.State>
            ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(req).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (error instanceof HttpErrorResponse) {
                    // server-side error
                    if ( error.status === 400 ) {
                        this.alertService.showAlert(error.error.message, 'error');
                        // this.store.dispatch(fromCustomer.addCustomerFailure({error}));
                    }
                    return throwError(error);
                } else {
                    // client-side error
                    return throwError(error);
                }
                })
            );
    }
}
