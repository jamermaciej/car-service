import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import * as fromAuth from '../../../store';
import { getAccessToken, getIsRefreshing, getRefreshToken } from 'src/app/store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { catchError, exhaustMap, filter, map, mergeMap, pluck, retry, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { refreshToken, refreshTokenSuccess } from '../../../store';
import { AuthService } from '../../services/auth/auth.service';
import { Actions, ofType } from '@ngrx/effects';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<fromAuth.State>,
    private authService: AuthService,
    private actions: Actions,
    ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(getAccessToken).pipe(
      take(1),
      withLatestFrom(this.store.select(getIsRefreshing)),
      exhaustMap(([accessToken, isRefreshing]) => {
        const isApiUrl = request.url.startsWith(environment.apiUrl) && !request.url.endsWith('/login') && !request.url.endsWith('/refresh-token');
        if (!accessToken || !isApiUrl) {
          return next.handle(request);
        }

        // if (!accessToken || this.isTokenExpired(accessToken)) {
        //   return this.handleAccessTokenExpiredRequest(request, next);
        // }

        // if (isRefreshing) {
        //   return this.handleRequestWithNewAccessToken(request, next);
        // }

        // return next.handle(this.addTokenHeader(request,accessToken));

        const clonedReq = this.addTokenHeader(request, accessToken);
        return next.handle(clonedReq).pipe(
          // retry(1),
          catchError((err) => {
            if (err instanceof HttpErrorResponse) {
              if (err && err.status === 401) {
                this.store.dispatch(fromAuth.logout());
                // return this.handle401Error(clonedReq, next, err);
              }
            }
            return throwError(err);
            }
          )
        )
      })
    );
  }

  // handleAccessTokenExpiredRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	// 	return this.store.select(getRefreshToken)
	// 		.pipe(
	// 			take(1),
	// 			withLatestFrom(this.store.select(getIsRefreshing)),
	// 			switchMap(([refreshToken, isRefreshing]) => {
	// 				if (!refreshToken || this.isTokenExpired(refreshToken)) {

  //           this.store.dispatch(fromAuth.logout());

	// 					throw new HttpErrorResponse({
	// 						status: 403,
	// 						error: 'Refresh token expired',
	// 						url: request.url
	// 					});
	// 				}

	// 				if (!isRefreshing) {
	// 					this.store.dispatch(fromAuth.refreshToken({ refreshToken }));
	// 				}

	// 				return this.handleRequestWithNewAccessToken(request, next);
	// 			})
	// 		);
	// }

  // handleRequestWithNewAccessToken(request: HttpRequest<any>, next: HttpHandler, skipCurrent = false): Observable<HttpEvent<any>> {
	// 	return this.actions.pipe(
	// 		filter((action) => action.type === fromAuth.refreshTokenSuccess.type ||
	// 			action.type === fromAuth.refreshTokenFailure.type),
	// 		// skip(1),
	// 		switchMap((action) => {
	// 			if (action.type === fromAuth.refreshTokenSuccess.type) {
	// 				return next.handle(this.addTokenHeader(request, (action as any).accessToken));
	// 			} else {

	// 				throw new HttpErrorResponse({
	// 					status: 403,
	// 					error: 'Refresh token invalid',
	// 					url: request.url
	// 				});
	// 			}
	// 		})
	// 	);
	// }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // private isRefreshing = false;
  // private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
  //   if (!this.isRefreshing) {
  //     this.isRefreshing = true;
  //     this.refreshTokenSubject.next(null);

  //     return this.store.select(getRefreshToken).pipe(
  //       take(1),
  //       switchMap(token => {
  //         return this.authService.refreshToken(token).pipe(
  //           pluck('accessToken'),
  //           switchMap((accessToken: any) => {
  //             this.isRefreshing = false;
  //             this.refreshTokenSubject.next(accessToken);
  //             this.store.dispatch(refreshTokenSuccess({ accessToken }));
  //             return next.handle(this.addTokenHeader(request, accessToken));
  //           }),
  //           catchError(error => {
  //             this.isRefreshing = false;
  //             this.store.dispatch(fromAuth.logout());
  //             return throwError(() => error);
  //           }))
  //       })
  //     );
  //   } else {
  //     return this.refreshTokenSubject.pipe(
  //       filter(token => token != null),
  //       take(1),
  //       switchMap(jwt => {
  //         return next.handle(this.addTokenHeader(request, jwt));
  //       }));
  //   }
  // }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler,
    originalError: any
  ) {
    return this.store.select(getRefreshToken).pipe(
      take(1),
      withLatestFrom(this.store.select(getIsRefreshing)),
      switchMap(([refreshToken, isRefreshing]) => {
        if (!isRefreshing) {
          this.store.dispatch(fromAuth.refreshToken());
        }

        return this.actions.pipe(
          filter((action) => action.type === fromAuth.refreshTokenSuccess.type || action.type === fromAuth.refreshTokenFailure.type),
          switchMap(action => {
            if (action.type === fromAuth.refreshTokenSuccess.type) {
              // console.log((action as any).accessToken);
              return next.handle(this.addTokenHeader(req, (action as any).accessToken));
            } else {
              return throwError(() => originalError);
            }
          })
        )

        // return this.authService.refreshToken(token).pipe(
        //   switchMap(accessToken => {
        //     this.store.dispatch(refreshTokenSuccess({ ...accessToken }));
        //     return next.handle(this.addTokenHeader(req, accessToken.accessToken));
        //   })
        // )
        // return this.store.select(getAccessToken).pipe(
        //   mergeMap(accessToken => next.handle(this.addTokenHeader(req, accessToken)))
        // );
      }),
      catchError(error => {
        this.store.dispatch(fromAuth.logout());
        return throwError(() => originalError);
      })
    )
  }

  private isTokenExpired(token: string) {
		if (!token) {
			return true;
		}

		const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    // console.log(new Date(expiry * 1000));
		return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
	}

}
