import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NbCardModule} from '../../../@core/nebular-theme/components/card/card.module';
import {NbInputModule} from '../../../@core/nebular-theme/components/input/input.module';
import {NbSelectModule} from '../../../@core/nebular-theme/components/select/select.module';
import {NbButtonModule} from '../../../@core/nebular-theme/components/button/button.module';
import {NbCheckboxModule} from '../../../@core/nebular-theme/components/checkbox/checkbox.module';
import {NbThemeModule} from '../../../@core/nebular-theme/theme.module';
import {NgModule} from '@angular/core';

const COMPONENTS = [
];

const MODULES = [
  CommonModule,
  ReactiveFormsModule,
  RouterModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbButtonModule,
  NbCheckboxModule,
  NbThemeModule.forRoot(),
];

const ENTRY_COMPONENTS = [
];

const SERVICES = [

];

@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    ...SERVICES,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class TemplateBuilder {
}
