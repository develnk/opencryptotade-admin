import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbUserModule,
  NbActionsModule,
  NbContextMenuModule,
  NbSidebarModule,
  NbLayoutModule,
} from '../@core/nebular-theme/public_api';
import { NbEvaIconsModule } from '../@core/eva-icons/eva-icons.module';

import {
  FooterComponent,
  HeaderComponent,
} from './components';


import { DEFAULT_THEME } from './styles/theme.default';
import { LayoutComponent } from './layout';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  LayoutComponent,
];


@NgModule({
  imports: [CommonModule, ...NB_MODULES],
  exports: [CommonModule, ...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'default',
          },
          [ DEFAULT_THEME ],
        ).providers,
      ],
    } as ModuleWithProviders;
  }
}
