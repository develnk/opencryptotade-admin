/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnDestroy } from '@angular/core';

import { NbAuthService } from '../services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-auth',
  template: `
    <nb-auth-block>
        <router-outlet></router-outlet>
    </nb-auth-block>
  `,
})
export class NbAuthComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  subscription: any;

  authenticated = false;
  token = '';

  // showcase of how to use the onAuthenticationChange method
  constructor(protected auth: NbAuthService) {

    this.subscription = auth.onAuthenticationChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((authenticated: boolean) => {
        this.authenticated = authenticated;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
