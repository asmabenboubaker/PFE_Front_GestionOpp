import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticComponent } from './static/static.component';
import {RouterModule, Routes} from "@angular/router";
import {GridProjetComponent} from "../projet/grid-projet/grid-projet.component";
import {DxPieChartModule} from "devextreme-angular";
import {
  DxiSeriesModule,
  DxoConnectorModule,
  DxoExportModule,
  DxoLabelModule,
  DxoSizeModule
} from "devextreme-angular/ui/nested";

export const routes: Routes  = [
  {
    path: 'all',
    component: StaticComponent,
    data: {breadcrumb: 'Consultation dashboard'},
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    StaticComponent
  ],
  imports: [
    CommonModule,
    DxPieChartModule,
    DxiSeriesModule,
    DxoConnectorModule,
    DxoExportModule,
    DxoLabelModule,
    DxoSizeModule,
    RouterModule.forChild(routes),
  ]
})
export class DashboardModule { }
