import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentComponent } from './department.component';
import { UserFormComponent } from './user-form/user-form.component';
import { Ng2SmartTableModule } from '../../../@core/ng2-smart-table';
import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentService } from './department.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NbButtonModule, NbCardModule, NbInputModule, NbThemeModule, NbWindowModule } from '@nebular/theme';

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
