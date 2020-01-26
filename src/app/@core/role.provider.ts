import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NbRoleProvider } from '@nebular/security';
import { NbAuthService } from './nebular-auth/services/auth.service';
import { NbAuthOAuth2Token } from './nebular-auth/services/token/token';


@Injectable()
export class RoleProvider implements NbRoleProvider {

  constructor(private authService: NbAuthService) {
  }

  getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthOAuth2Token) => {
          return token.isValid() ? token.getPayload().role : 'guest';
        }),
      );
  }
}
