import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticComponent } from './static/static.component';
import {RouterModule, Routes} from "@angular/router";
import {GridProjetComponent} from "../projet/grid-projet/grid-projet.component";
import {DxBoxModule, DxChartModule, DxPieChartModule, DxPolarChartModule} from "devextreme-angular";
import {
  DxiSeriesModule,
  DxoConnectorModule,
  DxoExportModule,
  DxoLabelModule,
  DxoSizeModule
} from "devextreme-angular/ui/nested";
import { MapsComponent } from './maps/maps.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";

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
    StaticComponent,
    MapsComponent
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
        DxChartModule,
        DxPolarChartModule,
        DxBoxModule,
        LeafletModule
    ]
})
export class DashboardModule { }
