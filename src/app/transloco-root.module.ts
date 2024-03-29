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
import config from './../assets/config.json';

import {
  TranslocoPersistTranslationsModule,
  PERSIST_TRANSLATIONS_STORAGE
} from '@ngneat/transloco-persist-translations';
import { TranslocoPersistLangModule, TRANSLOCO_PERSIST_LANG_STORAGE } from '@ngneat/transloco-persist-lang';
import { LocaleFormatOptions, TranslocoLocaleModule } from '@ngneat/transloco-locale';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

export function getLangFn({ cachedLang, browserLang, cultureLang, defaultLang }) {
  // default return cachedLang or defaultLang
  const isBrowserLangSupported = config.locales.supported_locales.some((local => local === browserLang));
  const lang = isBrowserLangSupported ? browserLang : defaultLang;
  return cachedLang ? cachedLang : lang;
}

const globalFormatConfig: LocaleFormatOptions = {
  date: {
    dateStyle: 'medium'
  }
};

@NgModule({
  exports: [ TranslocoModule ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: config.locales.supported_locales,
        defaultLang: config.locales.default_locale,
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
    }),
    TranslocoPersistLangModule.init({
      getLangFn,
      storage: {
        provide: TRANSLOCO_PERSIST_LANG_STORAGE,
        useValue: localStorage
      }
    }),
    TranslocoLocaleModule.init({
      langToLocaleMapping: {
        en: 'en-US',
        pl: 'pl-PL'
      },
      localeConfig: {
        global: globalFormatConfig
      }
    })
  ],
})
export class TranslocoRootModule {}
