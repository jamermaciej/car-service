import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AppInitService {
    constructor(private translate: TranslateService) {}

    Init(): Promise<any> {
        const defaultLocale = 'pl';

        return new Promise<void>(resolve => {
          this.translate.addLangs(['en', 'pl']);
          this.translate.setDefaultLang(defaultLocale);
          const browserLang = this.translate.getBrowserLang();
          this.translate.use(browserLang.match(/en|pl/) ? browserLang : 'pl');

          resolve();
        });
    }
}
