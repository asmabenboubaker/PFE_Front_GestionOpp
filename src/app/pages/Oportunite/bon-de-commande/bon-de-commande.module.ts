import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridBCComponent } from './grid-bc/grid-bc.component';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WorkflowComponentModule} from "../../Global/workflow-components/workflow-component.module";
import {DxButtonModule, DxDataGridModule, DxPopupModule, DxTemplateModule} from "devextreme-angular";
import {DxiColumnModule, DxoPagerModule, DxoPagingModule, DxoScrollingModule} from "devextreme-angular/ui/nested";
import {TranslateModule} from "@ngx-translate/core";
import { AddBcComponent } from './add-bc/add-bc.component';

export const routes: Routes  = [
  {
      path: 'all',
      component: GridBCComponent,
      data: {breadcrumb: 'Consultation BC'},
      pathMatch: 'full'
  } ,
    {
      path: 'add/:id',
      component: AddBcComponent,
      data: {breadcrumb: 'Ajouter BC'},
      pathMatch: 'full'
  }
  

];

@NgModule({
  declarations: [
    GridBCComponent,
    AddBcComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        WorkflowComponentModule,
        DxButtonModule,
        DxDataGridModule,
        DxPopupModule,
        DxTemplateModule,
        DxiColumnModule,
        DxoPagerModule,
        DxoPagingModule,
        DxoScrollingModule,
        TranslateModule,
    ]
})
export class BonDeCommandeModule { }
