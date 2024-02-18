import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridFactureComponent } from './grid-facture/grid-facture.component';
import {RouterModule, Routes} from "@angular/router";

export const routes: Routes  = [
  {
    path: 'all',
    component: GridFactureComponent,
    data: {breadcrumb: 'Consultation factures'},
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    GridFactureComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class FactureModule { }
