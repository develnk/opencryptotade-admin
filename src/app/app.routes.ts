import { Routes } from '@angular/router';
import { LoginComponent } from './dashboard/pages/login/login.component';
import { PageNotFoundComponent } from './dashboard/pages/page-not-found/page-not-found.component';

export const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
