import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbRoleProvider, NbSecurityModule} from '@nebular/security';
import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  LayoutService,
  StateService,
} from './utils';
import { RoleProvider } from './role.provider';

export const NB_CORE_PROVIDERS = [
  NbSecurityModule.forRoot({
    accessControl: {
      sales: {
        view: ['statistic'],
      },
      manager: {
        parent: 'sales',
        view: ['user'],
      },
      admin: {
        parent: 'manager',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,
  {
    provide: NbRoleProvider, useClass: RoleProvider,
  },
  LayoutService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    } as ModuleWithProviders<CoreModule>;
  }
}
