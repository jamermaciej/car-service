import { FlowRoutes } from '../../enums/flow';
import { UserService } from '../user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuard implements CanLoad, CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return true;
  }

  canLoad(route: Route): Observable<boolean> {
    return this.userService.user$.pipe(
      take(1),
      map(user => {
        const loggedIn = !!user;
        if (loggedIn) {
          this.router.navigate([FlowRoutes.DASHBOARD]);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
