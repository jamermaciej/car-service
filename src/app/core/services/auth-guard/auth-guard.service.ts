import { getUser, isLoggedIn } from './../../../store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { FlowRoutes } from './../../enums/flow';
import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Router, Route, CanActivateChild } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, tap, filter, switchMap, withLatestFrom } from 'rxjs/operators';
import * as fromRoot from './../../../store/reducers';
import * as routerActions from './../../../store/actions/router.actions';
import * as authActions from './../../../store/actions/auth.actions';

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
      withLatestFrom(this.store.select(getUser)),
      map(([isLogged, user]) => {
        // console.log(user);
        // this.store.dispatch(authActions.getMe());

        if (!isLoggedIn) this.store.dispatch(routerActions.go({path: [FlowRoutes.LOGIN], extras: { queryParams: { returnUrl: route.path } } }));

        return true;
      })
    );
  }

  canActivateChild(): Observable<boolean> {
    return this.store.select(isLoggedIn).pipe(
      take(1),
      map(isLoggedIn => {
        if (!isLoggedIn) this.store.dispatch(routerActions.go({ path: [FlowRoutes.LOGIN] }));

        return true;
      })
    );
  }
}
