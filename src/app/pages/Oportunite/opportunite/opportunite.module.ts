import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridOppComponent } from './grid-opp/grid-opp.component';
import { RouterModule, Routes } from '@angular/router';
import {DxButtonModule, DxDataGridModule, DxFormModule} from "devextreme-angular";


export const routes: Routes  = [
  {
      path: 'all',
      component: GridOppComponent,
      data: {breadcrumb: 'Consultation opportunité'},
      pathMatch: 'full'
  },
];
@NgModule({
  declarations: [
    GridOppComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
      DxDataGridModule ,
      DxFormModule,
      DxButtonModule,
  ]
})
export class OpportuniteModule { }
