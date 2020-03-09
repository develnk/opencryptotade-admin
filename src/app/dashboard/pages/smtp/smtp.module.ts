import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SMTPComponent } from './smtp.component';
import { SMTPRoutingModule } from './smtp-routing.module';
import { NbCardModule } from '../../../@core/nebular-theme/components/card/card.module';
import { NbCheckboxModule } from '../../../@core/nebular-theme/components/checkbox/checkbox.module';
import { NbInputModule } from '../../../@core/nebular-theme/components/input/input.module';
import { NbButtonModule } from '../../../@core/nebular-theme/components/button/button.module';
import { NbSelectModule } from '../../../@core/nebular-theme/components/select/select.module';
import { NbThemeModule } from '../../../@core/nebular-theme/theme.module';
import { SMTPService } from './smtp.service';


const COMPONENTS = [
    SMTPComponent
];

const MODULES = [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SMTPRoutingModule,
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
    SMTPService
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
export class SMTPModule {
}
