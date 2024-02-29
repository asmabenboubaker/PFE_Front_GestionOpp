import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridDemandeComponent } from './grid-demande/grid-demande.component';
import {RouterModule, Routes} from "@angular/router";
import { AddDemandeComponent } from './add-demande/add-demande.component';
import {DxDataGridModule, DxPopupModule} from "devextreme-angular";
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

export const routes: Routes  = [
  {
      path: 'user',
      component: GridDemandeComponent,
      data: {breadcrumb: 'Consultation demande'},
      pathMatch: 'full'
  },
  {
    path: 'add',
    component:  AddDemandeComponent,
    data: {breadcrumb: 'add demande'},
    pathMatch: 'full'
},
    { path: 'edit/:id', component: EditdemandeComponent },

];

@NgModule({
  declarations: [
  GridDemandeComponent,
  AddDemandeComponent,
  EditdemandeComponent],
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
        SharedModuleModule,
    ]
})


export class DemandeModule { }
