import { FlowRoutes } from './../../enums/flow';
import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Router, Route, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {
  constructor(private userService: UserService, private router: Router) {}

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
            this.router.navigate([FlowRoutes.DASHBOARD]);
            return false;
          }
        })
      );
  }

  canLoad(route: Route): Observable<boolean> {
    return this.userService.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) this.router.navigate([FlowRoutes.LOGIN], { queryParams: { returnUrl: route.path }});
      })
    );
  }

  canActivateChild(): Observable<boolean> {
    return this.userService.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) this.router.navigate([FlowRoutes.LOGIN]);
      })
    );
  }
}
