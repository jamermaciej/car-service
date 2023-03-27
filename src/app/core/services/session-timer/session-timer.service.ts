import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { getAccessToken } from 'src/app/store/selectors/auth.selectors';
import { SubscriptionHelperComponent } from 'src/app/_helpers/subscription-helper.component';

@Injectable({
  providedIn: 'root'
})
export class SessionTimerService extends SubscriptionHelperComponent {

  private _timeoutSeconds = 1 * 60;
  private _count = 0;
  private _timerSubscription!: Subscription;
  private _timer: Observable<number> = interval(1000);
  private _remainSeconds = new Subject<number>();

  remainSeconds$ = this._remainSeconds.asObservable();

  constructor(private store: Store) {
    super();
  }

  getTimeout() {
    this.store.select(getAccessToken).pipe(
      takeUntil(this.destroySubject$),
      filter(token => !!token),
    ).subscribe(token => {
        const jwtToken = JSON.parse(atob(token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now();

        this._timeoutSeconds = Math.floor(timeout / 1000);
        this._count = this._timeoutSeconds;
    });
  }

  startTimer() {
    this.stopTimer();
    this.getTimeout();

    this._timerSubscription = this._timer.subscribe(n => {
      if (this._count > 0) {
        this._count--;
        this._remainSeconds.next(this._count);
      }
    });
  }

  stopTimer() {
    if (this._timerSubscription) {
      this._timerSubscription.unsubscribe();
    }
  }

  resetTimer() {
    this.startTimer();
  }

}
