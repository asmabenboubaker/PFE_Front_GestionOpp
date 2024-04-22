import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridProjetComponent } from './grid-projet/grid-projet.component';
import {RouterModule, Routes} from '@angular/router';
import { EditProjectComponent } from './edit-project/edit-project.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ReactiveTypedFormsModule} from "@rxweb/reactive-form-validators";
import {WorkflowComponentModule} from "../../Global/workflow-components/workflow-component.module";

export const routes: Routes  = [
  {
      path: 'all',
      component: GridProjetComponent,
      data: {breadcrumb: 'Consultation projet'},
      pathMatch: 'full'
  },
    {
        path: 'edit/:id',
        component: EditProjectComponent,
        data: {breadcrumb: 'Edit projet'},
        pathMatch: 'full'
    }

];

@NgModule({
  declarations: [
   
  
    EditProjectComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        ReactiveTypedFormsModule,
        WorkflowComponentModule,
    ]
})
export class ProjetModule { }
