import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridProjetComponent } from './grid-projet/grid-projet.component';
import {RouterModule, Routes} from '@angular/router';
import { EditProjectComponent } from './edit-project/edit-project.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ReactiveTypedFormsModule} from "@rxweb/reactive-form-validators";
import {WorkflowComponentModule} from "../../Global/workflow-components/workflow-component.module";
import { TaskBoardComponent } from './task-board/task-board.component';
import {MeetingComponent} from "./meeting/meeting.component";
import {SharedModuleModule} from "../../Global/shared-module/shared-module.module";
import {Service} from "./task-board/app.service";


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
    },
    {
        path: 'tasks',
        component: TaskBoardComponent,
        data: {breadcrumb: 'Task board'},
        pathMatch: 'full'
    },
    {
        path:'meeting',
        component:MeetingComponent,
        data: {breadcrumb: 'Meeting'},
        pathMatch: 'full'

    }

];

@NgModule({
  declarations: [
   
  
    EditProjectComponent,
           TaskBoardComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        ReactiveTypedFormsModule,
        WorkflowComponentModule,
        SharedModuleModule,

    ],
    providers: [
        Service,
        TaskBoardComponent

    ],
})
export class ProjetModule { }
