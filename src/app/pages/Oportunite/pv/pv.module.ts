import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridPvComponent } from './grid-pv/grid-pv.component';
import {RouterModule, Routes} from "@angular/router";

import {GridOffreComponent} from "../offre/grid-offre/grid-offre.component";


export const routes: Routes  = [
  {
    path: 'all',
    component: GridPvComponent,
    data: {breadcrumb: 'Consultation pv'},
    pathMatch: 'full'
  }


];
@NgModule({
  declarations: [
    GridPvComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PvModule { }
