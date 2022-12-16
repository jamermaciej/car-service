import {Component, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";

@Component({
  template: '',
})
export class SubscriptionHelperComponent implements OnDestroy {
  protected destroySubject$: Subject<boolean> = new Subject();

  ngOnDestroy() {
    this.destroySubject$.next(true);
    this.destroySubject$.complete();
  }
}
