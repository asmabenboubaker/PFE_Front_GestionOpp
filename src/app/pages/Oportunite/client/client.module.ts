import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GridClientComponent } from './grid-client/grid-client.component';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import {
  DxButtonModule,
  DxDataGridModule,
  DxFormModule,
  DxTemplateModule,
  DxTextAreaModule,
  DxTooltipModule
} from 'devextreme-angular';
import { AddClientComponent } from './add-client/add-client.component';
import {DxPopupModule} from "devextreme-angular/ui/popup";
import {DxSelectBoxModule} from "devextreme-angular/ui/select-box";
import {ReactiveFormsModule} from "@angular/forms";
import {MdbFormsModule} from "mdb-angular-ui-kit/forms";
import {SharedModuleModule} from "../../Global/shared-module/shared-module.module";
import {HttpServicesComponent} from "../../Global/ps-tools/http-services/http-services.component";
import { ClientsListComponent } from './clients-list/clients-list.component';

export const routes: Routes  = [
  {
      path: 'all',
      component: GridClientComponent,
      data: {breadcrumb: 'Consultation client'},
      pathMatch: 'full'
  },
  {
    path: 'add',
    component:  AddClientComponent,
    data: {breadcrumb: 'add client'},
    pathMatch: 'full'
},
    {
        path: 'list',
        component:  ClientsListComponent,
        data: {breadcrumb: 'Liste des clients'},
        pathMatch: 'full'
    }
];

@NgModule({
  declarations: [
    GridClientComponent,
    AddClientComponent,
    ClientsListComponent,

  ],
  exports: [
    AddClientComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    SharedModuleModule,
    DxTemplateModule,


  ]
})
export class ClientModule { }
