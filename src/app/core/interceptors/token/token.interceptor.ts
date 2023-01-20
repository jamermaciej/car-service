import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import * as fromAuth from '../../../store';
import { getToken } from 'src/app/store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { catchError, exhaustMap, retry, take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromAuth.State>) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(getToken).pipe(
      take(1),
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
        return next.handle(clonedReq).pipe(
          retry(1),
          catchError((err) => {
            if (err instanceof HttpErrorResponse) {
              if (err && err.status === 401) {
                this.store.dispatch(fromAuth.logout());
                // return this.handle401Error(req, next, error);
              }
            }
            return throwError(err);
            }
          )
        )
        
      })
    );
  }

  // private handle401Error(
  //   req: HttpRequest<any>,
  //   next: HttpHandler,
  //   originalError: any
  // ) {
  //   return this.authService.refreshCookie().pipe(
  //     switchMap(() => {
  //       return next.handle(req);
  //     }),
  //     catchError((error) => {
  //       localStorage.removeItem('user-profile');

  //       this.route.navigate(['/']);
  //       return throwError(() => originalError);
  //     })
  //   );
  // }

}
