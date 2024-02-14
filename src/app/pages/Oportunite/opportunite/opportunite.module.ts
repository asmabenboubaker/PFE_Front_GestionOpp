import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridOppComponent } from './grid-opp/grid-opp.component';
import { RouterModule, Routes } from '@angular/router';


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
  ]
})
export class OpportuniteModule { }
