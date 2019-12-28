import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpClient, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {NbAuthOAuth2Token} from '../nebular-auth/services/token/token';
import {NbAuthService} from '../nebular-auth/services/auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token = '';

  constructor(private authService: NbAuthService) {
    this.authService.getToken()
      .subscribe((payload: NbAuthOAuth2Token) => {
        if (payload.isValid()) {
          this.token =  payload.getValue();
        }
      });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const x = req.urlWithParams;
    const cloneReq = req.clone({
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + this.token
      }),
    });
    return next.handle(cloneReq);
  }
}
