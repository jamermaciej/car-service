import { User } from 'src/app/shared/models/user.model';
import { getUser, isLoggedIn } from './../../../store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { FlowRoutes } from './../../enums/flow';
import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Router,
  Route,
  CanActivateChild,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  map,
  take,
  tap,
  filter,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import * as fromRoot from './../../../store/reducers';
import * as routerActions from './../../../store/actions/router.actions';

@Injectable({
  providedIn: 'root',
})
export class UserRoleGuard implements CanLoad {
  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {}

  canLoad(route: Route): Observable<boolean> {
    return this.store.select(getUser).pipe(
      take(1),
      map((user: User) => {
        const roles = user?.roles;
        if (route.data && roles.indexOf(route.data.roles) !== -1) {
          return true;
        } else {
          this.store.dispatch(
            routerActions.go({ path: [FlowRoutes.DASHBOARD] })
          );
          return false;
        }
      })
    );
  }
}
