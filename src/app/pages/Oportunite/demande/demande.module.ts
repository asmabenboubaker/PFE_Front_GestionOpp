import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridDemandeComponent } from './grid-demande/grid-demande.component';
import {RouterModule, Routes} from "@angular/router";
import { AddDemandeComponent } from './add-demande/add-demande.component';
import { BaseChartDirective } from 'ng2-charts';
import {DxDataGridModule, DxPieChartModule, DxPopupModule} from "devextreme-angular";
import {
    DxiItemModule,
    DxiValidationRuleModule,
    DxoEditingModule,
    DxoExportModule,
    DxoFilterRowModule,
    DxoFormModule,
    DxoHeaderFilterModule,
    DxoPagerModule,
    DxoPagingModule,
    DxoPopupModule,
    DxoScrollingModule
} from "devextreme-angular/ui/nested";
import {SharedModuleModule} from "../../Global/shared-module/shared-module.module";
import { EditdemandeComponent } from './editdemande/editdemande.component';
import {WorkflowComponentModule} from "../../Global/workflow-components/workflow-component.module";
import {CardsModule} from "angular-bootstrap-md";
import {AttachmentModule} from "../../Global/attachment/attachment.module";
import {DxSelectBoxModule} from "devextreme-angular/ui/select-box";
import { GridValidationComponent } from './grid-validation/grid-validation.component';


export const routes: Routes  = [
  {
      path: 'user',
      component: GridDemandeComponent,
      data: {breadcrumb: 'Consultation demande'},
      pathMatch: 'full'
  },
  {
    path: 'add/:id',
    component:  AddDemandeComponent,
    data: {breadcrumb: 'add demande'},
    pathMatch: 'full'
},
    {
        path: 'add',
        component:  AddDemandeComponent,
        data: {breadcrumb: 'add demande 2'},
        pathMatch: 'full'
    },
    { path: 'edit/:id', component: EditdemandeComponent },

    {
        path: 'validation',
        component: GridValidationComponent,
        data: {breadcrumb: 'Validation demande'},
        pathMatch: 'full'
    },


];

@NgModule({
  declarations: [
  GridDemandeComponent,
  AddDemandeComponent,
  EditdemandeComponent,
  GridValidationComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        // DxDataGridModule,
        // DxiItemModule,
        // DxiValidationRuleModule,
        // DxoEditingModule,
        // DxoExportModule,
        // DxoFilterRowModule,
        // DxoFormModule,
        // DxoHeaderFilterModule,
        // DxoPagerModule,
        // DxoPagingModule,
        // DxoPopupModule,
        // DxoScrollingModule,
        // DxPopupModule,
        DxPieChartModule,
        DxSelectBoxModule,
        SharedModuleModule,
        WorkflowComponentModule,
        CardsModule,
        AttachmentModule,
    ]
})


export class DemandeModule { }
