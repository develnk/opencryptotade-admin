import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbLayoutModule, NbCardModule, NbButtonModule, NbListModule, NbAccordionModule, NbInputModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { TemplateBuilderRoutingModule } from './template_builder-routing.module';
import { TemplateBuilderComponent } from './template_builder.component';
import { TemplateBuilderService } from './template_builder.service';
import { ListObjectsComponent } from './list_objects/list_objects.component';
import { TemplateComponent } from './template/template.component';

const COMPONENTS = [
  TemplateBuilderComponent,
  ListObjectsComponent,
  TemplateComponent
];

const MODULES = [
  CommonModule,
  ReactiveFormsModule,
  RouterModule,
  TemplateBuilderRoutingModule,
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbLayoutModule,
  NbListModule,
  NbAccordionModule
];

const ENTRY_COMPONENTS = [
];

const SERVICES = [
  TemplateBuilderService
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
