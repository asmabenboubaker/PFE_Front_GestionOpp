import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridOffreComponent } from './grid-offre/grid-offre.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes  = [
  {
      path: 'all',
      component: GridOffreComponent,
      data: {breadcrumb: 'Consultation demande'},
      pathMatch: 'full'
  } 
 

];

@NgModule({
  declarations: [
    GridOffreComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class OffreModule { }
