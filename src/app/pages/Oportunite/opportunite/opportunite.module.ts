import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridOppComponent } from './grid-opp/grid-opp.component';
import { RouterModule, Routes } from '@angular/router';
import {
    DxAccordionModule,
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    DxPopupModule,
    DxSliderModule
} from "devextreme-angular";
import {TranslateModule} from "@ngx-translate/core";
import {EditOpportuniteComponent} from "./edit-opportunite/edit-opportunite.component";
import {WorkflowComponentModule} from "../../Global/workflow-components/workflow-component.module";
import {SharedModuleModule} from "../../Global/shared-module/shared-module.module";
import { EtudeOppComponent } from './etude-opp/etude-opp.component';
import {AddDetailsComponent} from "./add-details/add-details.component";
import {GridModule} from "@syncfusion/ej2-angular-grids";
import {MatFormFieldModule} from "@angular/material/form-field";


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
    {
        path: 'edit/:id',
        component: EditOpportuniteComponent,
        data: {breadcrumb: 'Edit opportunité'},
        pathMatch: 'full'
    },
    {
        path: 'etude',
        component: EtudeOppComponent,
        data: {breadcrumb: 'Etude opportunité'},
        pathMatch: 'full'
    },
    {
        path: 'add-details',
        component: AddDetailsComponent,
        data: {breadcrumb: 'Add Details'},
        pathMatch: 'full'
    }
];
@NgModule({
  declarations: [
    GridOppComponent,
  EditOpportuniteComponent,
  EtudeOppComponent,
      AddDetailsComponent
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
        DxAccordionModule,
        DxSliderModule,
        GridModule,
        MatFormFieldModule,
    ]
})
export class OpportuniteModule { }
