import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridBCComponent } from './grid-bc/grid-bc.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes  = [
  {
      path: 'all',
      component: GridBCComponent,
      data: {breadcrumb: 'Consultation BC'},
      pathMatch: 'full'
  } 
  

];

@NgModule({
  declarations: [
    GridBCComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class BonDeCommandeModule { }
