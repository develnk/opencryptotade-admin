import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SMTPComponent } from './smtp.component';

export const routes: Routes = [
    {
        path: '',
        component: SMTPComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SMTPRoutingModule {
}
