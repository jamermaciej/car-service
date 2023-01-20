import { getUser, isLoggedIn } from './../../../store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { FlowRoutes } from './../../enums/flow';
import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Router, Route, CanActivateChild } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, tap, filter, switchMap, withLatestFrom, catchError } from 'rxjs/operators';
import * as fromRoot from './../../../store/reducers';
import * as fromAuth from './../../../store';
import * as routerActions from './../../../store/actions/router.actions';
import * as authActions from './../../../store/actions/auth.actions';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {
  constructor(private userService: UserService, private router: Router, private store: Store<fromRoot.State>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.store.select(isLoggedIn).pipe(
        take(1),
        map(isLoggedIn => {
          if (!isLoggedIn) this.store.dispatch(routerActions.go({ path: [FlowRoutes.LOGIN] }));
  
          return true;
        })
      );
  }

  canLoad(route: Route): Observable<boolean> {
    return this.store.select(isLoggedIn).pipe(
      take(1),
      map((isLogged) => {
        if (!isLoggedIn) this.store.dispatch(routerActions.go({path: [FlowRoutes.LOGIN], extras: { queryParams: { returnUrl: route.path } } }));

        return true;
      })
    );
  }

  // guard to check if token expired
  canActivateChild(): Observable<boolean> {
    return this.userService.getMe().pipe(
      switchMap((user: User) => {
        return of(true);
      }),
      catchError(() => {
        this.store.dispatch(fromAuth.logout());
        return of(false);
      })
    )
  }

  // guard to preloading store - check if data (user) exist in store, if no make api call to get data
  // canActivate(): Observable<boolean> {
  //   return this.getMe()
  //     .switchMap(() => of(true))
  //     .catch(() => of(false));
  // }

  // getMe(): Observable<any> {
  //   return this.store.select(getUser)
  //     .pipe(
  //       tap((data: any) => {
  //         if (!data) {
  //           this.store.dispatch(authActions.getMe());
  //         }
  //       }),
  //       filter((data: any) => data),
  //       take(1)
  //     )
  // }

}
