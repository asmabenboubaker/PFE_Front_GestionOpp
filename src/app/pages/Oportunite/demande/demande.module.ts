import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridDemandeComponent } from './grid-demande/grid-demande.component';
import {RouterModule, Routes} from "@angular/router";
import { AddDemandeComponent } from './add-demande/add-demande.component';
import {DxDataGridModule} from "devextreme-angular";
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
}

];

@NgModule({
  declarations: [
  GridDemandeComponent,
  AddDemandeComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DxDataGridModule,
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
        DxoScrollingModule,
    ]
})


export class DemandeModule { }
