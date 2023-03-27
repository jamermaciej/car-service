import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInitService } from './core/services/app-init.service';
import { TranslocoRootModule } from './transloco-root.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './store/reducers/router.reducer';

import { EffectsModule } from '@ngrx/effects';

import { effects, reducers, metaReducers } from './store';
import { HttpErrorInterceptor } from './core/interceptors/http/http.interceptor';

import localePl from '@angular/common/locales/pl';
import localeEn from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { TokenInterceptor } from './core/interceptors/token/token.interceptor';
import { SessionExpirationModalComponent } from './core/components/session-expiration-modal/session-expiration-modal.component';

// register locales
registerLocaleData(localePl);
registerLocaleData(localeEn);

export function initApp(appInitService: AppInitService) {
  return (): Promise<any> => appInitService.Init();
}

const config: SocketIoConfig = {
  url: environment.socketIoUrl,
  options: {
    path: environment.socketIoPath
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    HttpClientModule,
    TranslocoRootModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    EffectsModule.forRoot(effects),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AppInitService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
    // {
    //   provide: LOCALE_ID,
    //   useValue: 'pl'
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpErrorInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
