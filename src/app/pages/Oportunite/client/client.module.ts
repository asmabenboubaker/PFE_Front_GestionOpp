import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GridClientComponent } from './grid-client/grid-client.component';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { DxDataGridModule } from 'devextreme-angular';

export const routes: Routes  = [
  {
      path: 'all',
      component: GridClientComponent,
      data: {breadcrumb: 'Consultation client'},
      pathMatch: 'full'
  },
 
];

@NgModule({
  declarations: [
    GridClientComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
   
    BrowserTransferStateModule,
    DxDataGridModule,
  ]
})
export class ClientModule { }
