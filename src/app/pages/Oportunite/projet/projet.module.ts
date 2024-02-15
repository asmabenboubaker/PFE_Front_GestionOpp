import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridProjetComponent } from './grid-projet/grid-projet.component';
import { Routes } from '@angular/router';

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
    CommonModule
  ]
})
export class ProjetModule { }
