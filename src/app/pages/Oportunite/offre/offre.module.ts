import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridOffreComponent } from './grid-offre/grid-offre.component';
import { RouterModule, Routes } from '@angular/router';
import {DxButtonModule, DxDataGridModule, DxPopupModule, DxTemplateModule} from "devextreme-angular";
import {DxiColumnModule, DxoPagerModule, DxoPagingModule, DxoScrollingModule} from "devextreme-angular/ui/nested";
import {TranslateModule} from "@ngx-translate/core";
import {EditOffreComponent} from "./edit-offre/edit-offre.component";
import {SharedModuleModule} from "../../Global/shared-module/shared-module.module";
import {WorkflowComponentModule} from "../../Global/workflow-components/workflow-component.module";

export const routes: Routes  = [
  {
      path: 'all',
      component: GridOffreComponent,
      data: {breadcrumb: 'Consultation offres'},
      pathMatch: 'full'
  }  ,
    {
        path: 'edit/:id',
        component: EditOffreComponent,
        data: {breadcrumb: 'Modification offre'},
        pathMatch: 'full'
    }
 

];

@NgModule({
  declarations: [
    GridOffreComponent,
      EditOffreComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DxButtonModule,
        DxDataGridModule,
        DxPopupModule,
        DxTemplateModule,
        DxiColumnModule,
        DxoPagerModule,
        DxoPagingModule,
        DxoScrollingModule,
        TranslateModule,
        SharedModuleModule,
        WorkflowComponentModule,
    ]
})
export class OffreModule { }
