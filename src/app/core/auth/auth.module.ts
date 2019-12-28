import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '../nebular-auth/auth.module';
import { NgxLoginComponent } from './login/login.component';
import { NbDummyAuthStrategy } from '../nebular-auth/strategies/dummy/dummy-strategy';
import { NbTokenLocalStorage, NbTokenStorage } from '../nebular-auth/services/token/token-storage';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { NbAuthJWTInterceptor } from '../nebular-auth/services/interceptors/jwt-interceptor';
import { NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '../nebular-auth/auth.options';
import { NbOAuth2AuthStrategy } from '../nebular-auth/strategies/oauth2/oauth2-strategy';
import {
  NbOAuth2ClientAuthMethod,
  NbOAuth2GrantType,
  NbOAuth2ResponseType
} from '../nebular-auth/strategies/oauth2/oauth2-strategy.options';
import { NbAuthOAuth2Token } from '../nebular-auth/services/token/token';

export function filterInterceptorRequest(req: HttpRequest<any>) {
  return ['http://localhost:4400/api/auth/',
    'http://other.url/with/no/token/injected/',
  ]
    .some(url => req.url.includes(url));
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxAuthRoutingModule,
    NbAuthModule.forRoot({
      strategies: [
        NbDummyAuthStrategy.setup({
          name: 'dummy',
          alwaysFail: false,
          delay: 1000,
        }),
        NbOAuth2AuthStrategy.setup({
          name: 'password',
          clientId: 'browser',
          clientSecret: 'xxx',
          baseEndpoint: 'http://localhost:4000/uaa/oauth/',
          clientAuthMethod: NbOAuth2ClientAuthMethod.BASIC,
          redirect: {
            success: '/dashboard',
            failure: '',
            logout: '/auth/login',
          },
          defaultErrors: ['Something went wrong, please try again.'],
          defaultMessages: ['You have been successfully authenticated.'],
          authorize: {
            endpoint: 'http://localhost:4000/uaa/oauth/token',
            redirectUri: '/dashboard',
            responseType: NbOAuth2ResponseType.TOKEN,
            requireValidToken: true,
            scope: '',
            state: '',
            params: {}
          },
          token: {
            endpoint: 'token',
            grantType: NbOAuth2GrantType.PASSWORD,
            class: NbAuthOAuth2Token,
            requireValidToken: true,
            redirectUri: '/dashboard',
          },
          refresh: {
            endpoint: 'refresh-token',
            grantType: NbOAuth2GrantType.REFRESH_TOKEN,
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 0,
          strategy: 'password',
          rememberMe: false,
          showMessages: {
            success: true,
            error: true,
          },
        },
        logout: {
          strategy: 'password',
          redirectDelay: 0,
        },
      },
    }),
  ],
  declarations: [
    NgxLoginComponent
  ],
  providers: [
    { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: filterInterceptorRequest },
  ],
})
export class NgxAuthModule {
}
