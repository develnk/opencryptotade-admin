import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { BasicComponent } from './pages/basic/basic.component';
import { RegionalComponent } from './pages/regional/regional.component';
import { DaemonsComponent } from './pages/daemons/daemons.component';
import { AuthGuard } from '../@core/guards/auth-guard.service';
import { PageNotFoundComponent } from '../@core/page-not-found/page-not-found.component';
import { RoleGuard } from '../@core/guards/role-guard.service';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'basic',
            component: BasicComponent,
          },
          {
            path: 'department',
            loadChildren: () => import('./pages/department/department.module').then(m => m.DepartmentModule),
            data: { role: 'ADMIN' },
            canActivate: [ RoleGuard ],
          },
          {
            path: 'smtp',
            loadChildren: () => import('./pages/smtp/smtp.module').then(m => m.SMTPModule),
            data: { role: 'ADMIN' },
            canActivate: [ RoleGuard ],
          },
          {
            path: 'template_builder',
            loadChildren: () => import('./pages/template_builder/template_builder.module').then(m => m.TemplateBuilder),
            data: { role: 'ADMIN' },
            canActivate: [ RoleGuard ],
          },
          {
            path: 'regional',
            component: RegionalComponent,
          },
          {
            path: 'daemons',
            component: DaemonsComponent,
          },
          {
            path: '**',
            component: PageNotFoundComponent,
          },
        ],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
