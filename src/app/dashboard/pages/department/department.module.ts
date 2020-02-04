import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NbWindowModule } from '../../../@core/nebular-theme/components/window/window.module';
import { NbCardModule } from '../../../@core/nebular-theme/components/card/card.module';
import { NbButtonModule } from '../../../@core/nebular-theme/components/button/button.module';
import { DepartmentComponent } from './department.component';
import { UserFormComponent } from './user-form/user-form.component';
import { Ng2SmartTableModule } from '../../../@core/ng2-smart-table';
import { DepartmentRoutingModule } from './department-routing.module';
import { NbInputModule } from '../../../@core/nebular-theme/components/input/input.module';
import { NbThemeModule } from '../../../@core/nebular-theme/theme.module';
import { DepartmentService } from './department.service';
import { NgSelectModule } from '@ng-select/ng-select';

const COMPONENTS = [
  DepartmentComponent,
  UserFormComponent,
];

const MODULES = [
  CommonModule,
  ReactiveFormsModule,
  RouterModule,
  DepartmentRoutingModule,
  NbWindowModule.forChild(),
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbThemeModule.forRoot(),
  Ng2SmartTableModule,
  NgSelectModule
];

const ENTRY_COMPONENTS = [
  UserFormComponent
];

const SERVICES = [
  DepartmentService
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
export class DepartmentModule {
}
