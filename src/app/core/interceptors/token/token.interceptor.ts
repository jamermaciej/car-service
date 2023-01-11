import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as fromAuth from '../../../store';
import { getToken } from 'src/app/store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { exhaustMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromAuth.State>) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(getToken).pipe(
      exhaustMap(token => {
        const isApiUrl = request.url.startsWith(environment.apiUrl) && !request.url.endsWith('/login');
        if (!token && !isApiUrl) {
          return next.handle(request);
        }
        const clonedReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(clonedReq);
      })
    );
  }
}
