import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { getStatuses } from 'src/app/admin/store/selectors/statuses.selectors';
import { State } from 'src/app/admin/store/reducer/statuses.reducer';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import * as statusesActions from 'src/app/admin/store/actions/statuses.actions';
import { Status } from 'src/app/shared/models/status.model';

@Injectable({
  providedIn: 'root'
})
export class StatusesGuard implements CanActivate {
  constructor(private store: Store<State>) {}
  
  canActivate(): Observable<boolean> {
    return this.getFromStoreOrApi().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  getFromStoreOrApi(): Observable<boolean | Status[]> {
    return this.store.select(getStatuses).pipe(
      tap((statuses: Status[]) => {
        if (!statuses.length) this.store.dispatch(statusesActions.getStatuses());
      }),
      filter((statuses: Status[]) => !!statuses.length),
      take(1)
    )
  }
  
}
