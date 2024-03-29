import { Store } from '@ngrx/store';
import { isLoggedIn } from './../../../store/selectors/auth.selectors';
import { FlowRoutes } from '../../enums/flow';
import { UserService } from '../user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import * as routerActions from './../../../store/actions/router.actions';
import * as fromRoot from './../../../store/reducers';

@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuard implements CanLoad, CanActivate {
  constructor(private userService: UserService, private router: Router, private store: Store<fromRoot.State>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.store.select(isLoggedIn).pipe(
        take(1),
        map((isLogged) => {
          if (isLogged) this.store.dispatch(routerActions.go({ path: [FlowRoutes.DASHBOARD] }));
          return !isLogged;
        })
      );
  }

  canLoad(route: Route): Observable<boolean> {
    return this.store.select(isLoggedIn).pipe(
      take(1),
      map((isLogged) => {
        if (isLogged) this.store.dispatch(routerActions.go({ path: [FlowRoutes.DASHBOARD] }));
        return !isLogged;
      })
    );
  }
}
