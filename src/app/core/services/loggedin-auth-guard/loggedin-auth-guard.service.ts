import { Store } from '@ngrx/store';
import { isLoggedIn } from './../../../store/selectors/auth.selectors';
import { FlowRoutes } from '../../enums/flow';
import { UserService } from '../user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import * as routerActions from './../../../store/actions/router.actions';

@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuard implements CanLoad, CanActivate {
  constructor(private userService: UserService, private router: Router, private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.userService.user$.pipe(
        take(1),
        map(user => {
          const loggedIn = !!user;
          if (loggedIn) {
            this.store.dispatch(routerActions.go({ path: [FlowRoutes.DASHBOARD] }));
            return false;
          } else {
            return true;
          }
        })
      );
  }

  canLoad(route: Route): Observable<boolean> {
    return this.store.select(isLoggedIn).pipe(
      take(1),
      map((isLogged) => !isLogged),
      tap(() => this.store.dispatch(routerActions.go({ path: [FlowRoutes.DASHBOARD] })))
    );
  }
}
