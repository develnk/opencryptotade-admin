import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CellModule } from './components/cell/cell.module';
import { PagerModule } from './components/pager/pager.module';
import { TBodyModule } from './components/tbody/tbody.module';
import { THeadModule } from './components/thead/thead.module';
import { Ng2SmartTableComponent } from './ng2-smart-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CellModule,
    PagerModule,
    TBodyModule,
    THeadModule,
  ],
  declarations: [
    Ng2SmartTableComponent,
  ],
  exports: [
    Ng2SmartTableComponent,
  ],
})
export class Ng2SmartTableModule {
}
