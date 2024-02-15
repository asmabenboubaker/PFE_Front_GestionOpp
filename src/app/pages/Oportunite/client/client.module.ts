import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GridClientComponent } from './grid-client/grid-client.component';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { DxButtonModule, DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { AddClientComponent } from './add-client/add-client.component';

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
}
];

@NgModule({
  declarations: [
    GridClientComponent,
    AddClientComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
   
    BrowserTransferStateModule,
    DxDataGridModule ,
    DxFormModule,
    DxButtonModule,
    
    
  ]
})
export class ClientModule { }
