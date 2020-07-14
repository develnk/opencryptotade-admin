import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import {
  NbLayoutModule,
  NbCardModule,
  NbButtonModule,
  NbListModule,
  NbAccordionModule,
  NbInputModule,
  NbSelectModule,
  NbIconModule,
  NbSpinnerModule
} from '@nebular/theme';
import { TemplateBuilderRoutingModule } from './template_builder-routing.module';
import { TemplateBuilderComponent } from './template_builder.component';
import { TemplateBuilderService } from './services/template_builder.service';
import { ListObjectsComponent } from './list_objects/list_objects.component';
import { TemplateComponent } from './template/template.component';
import { ListObjectsService } from './services/list_objects.service';
import { FolderService } from './services/folder.service';
import { BlockBuilderService } from './services/block_builder.service';
import { TemplateService } from './services/template.service';

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
  NbSelectModule,
  NbIconModule,
  NbAccordionModule,
  NbSpinnerModule,
  DragDropModule
];

const ENTRY_COMPONENTS = [
];

const SERVICES = [
  TemplateBuilderService,
  ListObjectsService,
  FolderService,
  BlockBuilderService,
  TemplateService,
];

@NgModule({
  imports: [
    ...MODULES,
    FormsModule,
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
