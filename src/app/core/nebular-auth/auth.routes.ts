/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Routes } from '@angular/router';

import { NbAuthComponent } from './components/auth.component';
import { NbLoginComponent } from './components/login/login.component';
import { NbLogoutComponent } from './components/logout/logout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
    ],
  },
];

