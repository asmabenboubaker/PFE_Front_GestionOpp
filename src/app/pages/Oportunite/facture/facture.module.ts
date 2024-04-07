import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridFactureComponent } from './grid-facture/grid-facture.component';
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModuleModule} from "../../Global/shared-module/shared-module.module";
import { AddFactureComponent } from './add-facture/add-facture.component';
import {AddDemandeComponent} from "../demande/add-demande/add-demande.component";
import {WorkflowComponentModule} from "../../Global/workflow-components/workflow-component.module";
import {CardsModule} from "angular-bootstrap-md";

export const routes: Routes  = [

    {
        path: 'add/:id',
        component:  AddFactureComponent,
        data: {breadcrumb: 'add facture'},
        pathMatch: 'full'
    },
    {
        path: 'add',
        component:  AddFactureComponent,
        data: {breadcrumb: 'add facture 2'},
        pathMatch: 'full'
    },
    {
        path: 'all',
        component: GridFactureComponent,
        data: {breadcrumb: 'Consultation factures'},
        pathMatch: 'full'
    }
];

@NgModule({
  declarations: [
    GridFactureComponent,
    AddFactureComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        SharedModuleModule,

        WorkflowComponentModule,
        CardsModule,
    ]
})
export class FactureModule { }
