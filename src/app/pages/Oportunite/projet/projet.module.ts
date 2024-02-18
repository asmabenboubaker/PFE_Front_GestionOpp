import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridProjetComponent } from './grid-projet/grid-projet.component';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes  = [
  {
      path: 'all',
      component: GridProjetComponent,
      data: {breadcrumb: 'Consultation projet'},
      pathMatch: 'full'
  } 
 

];

@NgModule({
  declarations: [
   
  ],
  imports: [
      CommonModule,
      RouterModule.forChild(routes),
  ]
})
export class ProjetModule { }
