import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CellModule } from '../cell/cell.module';

import { Ng2SmartTableTheadComponent } from './thead.component';
import { AddButtonComponent } from './cells/add-button.component';
import { CheckboxSelectAllComponent } from './cells/checkbox-select-all.component';
import { ColumnTitleComponent } from './cells/column-title.component';
import { TitleComponent } from './cells/title/title.component';
import { TheadFormRowComponent } from './rows/thead-form-row.component';
import { TheadTitlesRowComponent } from './rows/thead-titles-row.component';

const THEAD_COMPONENTS = [
  AddButtonComponent,
  CheckboxSelectAllComponent,
  ColumnTitleComponent,
  TitleComponent,
  TheadFormRowComponent,
  TheadTitlesRowComponent,
  Ng2SmartTableTheadComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CellModule,
  ],
  declarations: [
    ...THEAD_COMPONENTS,
  ],
  exports: [
    ...THEAD_COMPONENTS,
  ],
})
export class THeadModule { }
