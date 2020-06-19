import { TranslocoService } from '@ngneat/transloco';
import { Injectable } from '@angular/core';
import { getBrowserLang } from '@ngneat/transloco';

@Injectable()
export class AppInitService {
     constructor(private translocoService: TranslocoService) {}

    Init(): Promise<any> {
        return new Promise<void>(resolve => {
          const browserLang = getBrowserLang();
          this.translocoService.setActiveLang(browserLang.match(/en|pl/) ? browserLang : 'pl');
          resolve();
      });
    }
}
