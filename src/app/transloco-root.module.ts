import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule
} from '@ngneat/transloco';
import { Injectable, NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { locales } from './../assets/config.json';

import {
  TranslocoPersistTranslationsModule,
  PERSIST_TRANSLATIONS_STORAGE
} from '@ngneat/transloco-persist-translations';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [ TranslocoModule ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: locales.supported_locales,
        defaultLang: locales.default_locale,
        reRenderOnLangChange: true,
        prodMode: environment.production,
      })
    }
  ],
  imports: [
    TranslocoPersistTranslationsModule.init({
      loader: TranslocoHttpLoader,
      storage: {
        provide: PERSIST_TRANSLATIONS_STORAGE,
        useValue: localStorage
      }
    })
],
})
export class TranslocoRootModule {}
