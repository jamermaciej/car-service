import { Store } from '@ngrx/store';
import { TranslocoService } from '@ngneat/transloco';
import { Injectable } from '@angular/core';
import { getBrowserLang } from '@ngneat/transloco';
import * as fromRoot from './../../store/reducers';

@Injectable()
export class AppInitService {
     constructor(private translocoService: TranslocoService, private store: Store<fromRoot.State>) {}

    Init(): Promise<any> {
        return new Promise<void>(resolve => {
          // const browserLang = getBrowserLang();
          // this.translocoService.setActiveLang(browserLang.match(/en|pl/) ? browserLang : 'pl');

          // const uid = JSON.parse(localStorage.getItem('user')).uid;
          // this.store.dispatch(profileActions.getUser({ uid }));
          // this.store.select(getUser).pipe(
          //   filter(user => user !== null && user !== undefined ),
          //   take(1)
          //   ).subscribe((user) => {
          //     resolve();
          // });
          resolve();
      });
    }
}
