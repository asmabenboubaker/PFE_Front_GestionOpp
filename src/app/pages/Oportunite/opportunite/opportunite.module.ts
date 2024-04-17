import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridOppComponent } from './grid-opp/grid-opp.component';
import { RouterModule, Routes } from '@angular/router';
import {DxButtonModule, DxDataGridModule, DxFormModule, DxPopupModule} from "devextreme-angular";
import {TranslateModule} from "@ngx-translate/core";
import {EditOpportuniteComponent} from "./edit-opportunite/edit-opportunite.component";
import {WorkflowComponentModule} from "../../Global/workflow-components/workflow-component.module";
import {SharedModuleModule} from "../../Global/shared-module/shared-module.module";


export const routes: Routes  = [
  {
      path: 'all',
      component: GridOppComponent,
      data: {breadcrumb: 'Consultation opportunité'},
      pathMatch: 'full'
  },
    {
        path: 'add/:id',
        component:EditOpportuniteComponent,
        data: {breadcrumb: 'add opportunité'},
        pathMatch: 'full'
    },
];
@NgModule({
  declarations: [
    GridOppComponent,
  EditOpportuniteComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DxDataGridModule,
        DxFormModule,
        DxButtonModule,
        DxPopupModule,
        TranslateModule,
        WorkflowComponentModule,
        SharedModuleModule,
    ]
})
export class OpportuniteModule { }
