import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbInputModule, NbSelectModule, NbThemeModule, NbCheckboxModule } from '@nebular/theme';
import { NgModule } from '@angular/core';

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
