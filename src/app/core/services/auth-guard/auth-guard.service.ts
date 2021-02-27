import { getUser, isLoggedIn } from './../../../store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { FlowRoutes } from './../../enums/flow';
import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Router, Route, CanActivateChild } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, tap, filter, switchMap, withLatestFrom } from 'rxjs/operators';
import * as profileActions from 'src/app/profile/store/actions/profile.actions';
import * as routerActions from './../../../store/actions/router.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {
  constructor(private userService: UserService, private router: Router, private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.userService.user$.pipe(
        take(1),
        map(user => {
          const roles = user?.roles;
          if (user && route.data && roles.indexOf(route.data.roles) !== -1) {
            return true;
          } else {
            this.store.dispatch(routerActions.go({ path: [FlowRoutes.DASHBOARD] }));
            return false;
          }
        })
      );
  }

  canLoad(route: Route): Observable<boolean> {
    return this.store.select(isLoggedIn).pipe(
      take(1),
      withLatestFrom(this.store.select(getUser)),
      map(([isLogged, user]) => {
        // if ( isLogged && !user ) {
        //   const uid = JSON.parse(localStorage.getItem('user')).uid;
        //   this.store.dispatch(profileActions.getUser({uid}));
        // }
        return isLogged;
      }),
      tap(loggedIn => {
        if (!loggedIn) {
          this.store.dispatch(routerActions.go({path: [FlowRoutes.LOGIN], extras: { queryParams: { returnUrl: route.path } } }));
        }
      })
    );
  }

  canActivateChild(): Observable<boolean> {
    return this.store.select(isLoggedIn).pipe(
      take(1),
      map((isLogged) => isLogged),
      tap(loggedIn => {
        if (!loggedIn) this.store.dispatch(routerActions.go({ path: [FlowRoutes.LOGIN] }));
      })
    );
  }
}
