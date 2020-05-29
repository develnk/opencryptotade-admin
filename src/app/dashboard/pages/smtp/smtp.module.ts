import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SMTPComponent } from './smtp.component';
import { SMTPRoutingModule } from './smtp-routing.module';
import { SMTPService } from './smtp.service';
import { NbButtonModule, NbCardModule, NbInputModule, NbSelectModule, NbThemeModule, NbCheckboxModule } from '@nebular/theme';


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
