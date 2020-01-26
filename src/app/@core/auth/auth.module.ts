import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';

import { NgxLoginComponent } from './login/login.component';
import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '../nebular-auth/auth.module';
import { NbTokenLocalStorage, NbTokenStorage } from '../nebular-auth/services/token/token-storage';
import { NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '../nebular-auth/auth.options';
import { NbAuthJWTInterceptor } from '../nebular-auth/services/interceptors/jwt-interceptor';
import { NbOAuth2AuthStrategy } from '../nebular-auth/strategies/oauth2/oauth2-strategy';
import {
  NbOAuth2ClientAuthMethod,
  NbOAuth2GrantType,
  NbOAuth2ResponseType
} from '../nebular-auth/strategies/oauth2/oauth2-strategy.options';
import { NbAuthOAuth2Token } from '../nebular-auth/services/token/token';
import { HttpErrorInterceptor } from '../interceptors/httpError.interceptor';
import { ENDPOINTS } from '../services/services-endpoints';

export function filterInterceptorRequest(req: HttpRequest<any>) {
  return [
    'http://localhost:4400/api/auth/',
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
        NbOAuth2AuthStrategy.setup({
          name: 'password',
          clientId: 'browser',
          clientSecret: 'xxx',
          baseEndpoint: ENDPOINTS.base_url + ENDPOINTS.base_auth,
          clientAuthMethod: NbOAuth2ClientAuthMethod.BASIC,
          redirect: {
            success: '/dashboard',
            failure: '',
            logout: '/auth/login',
          },
          defaultErrors: ['Something went wrong, please try again.'],
          defaultMessages: ['You have been successfully authenticated.'],
          authorize: {
            endpoint: ENDPOINTS.base_url + ENDPOINTS.auth,
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
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: filterInterceptorRequest },
  ],
})
export class NgxAuthModule {
}
