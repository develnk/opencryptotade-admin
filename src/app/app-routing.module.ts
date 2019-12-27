import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.module').then(m => m.NgxAuthModule),
    data: { preload: true }
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

const config: ExtraOptions = {
  useHash: false,
  enableTracing: true,
};


@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRouting {
}
