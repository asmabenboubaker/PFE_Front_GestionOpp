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
import { AddTaskComponent } from './add-task/add-task.component';
import {ClientModule} from "../client/client.module";
import { EquipeComponent } from './equipe/equipe.component';
import {DxBoxModule, DxGanttModule, DxPieChartModule} from "devextreme-angular";
import { StaticProjectComponent } from './static-project/static-project.component';
import {DxiSeriesModule, DxoConnectorModule, DxoSizeModule} from "devextreme-angular/ui/nested";
import {GanttModule} from "@syncfusion/ej2-angular-gantt";
import { AddProjetComponent } from './add-projet/add-projet.component';


export const routes: Routes  = [

    {
        path: 'edit/:id',
        component: EditProjectComponent,
        data: {breadcrumb: 'Edit projet'},
        pathMatch: 'full'
    },
    {
        path: 'tasks/:id',
        component: TaskBoardComponent,
        data: {breadcrumb: 'Task board'},
        pathMatch: 'full'
    },
    {
        path:'meeting',
        component:MeetingComponent,
        data: {breadcrumb: 'Meeting'},
        pathMatch: 'full'

    },
    {
        path:'equipe',
        component:EquipeComponent,
        data: {breadcrumb: 'Equipe'},
        pathMatch: 'full'

    },
    {
        path:'static/:id',
        component:StaticProjectComponent,
        data: {breadcrumb: 'Static'},
        pathMatch: 'full'

    },
    {
        path:'allproject',
        component:GridProjetComponent,
        data: {breadcrumb: 'All project'},
        pathMatch: 'full'
    },
    //add project
    {
        path:'addProject',
        component:AddProjetComponent,
        data: {breadcrumb: 'Add project'},
        pathMatch: 'full'
    }
];

@NgModule({
  declarations: [
   
  
    EditProjectComponent,
           TaskBoardComponent,
           AddTaskComponent,
      MeetingComponent,
      EquipeComponent,
      StaticProjectComponent,
      AddProjetComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        ReactiveTypedFormsModule,
        WorkflowComponentModule,
        SharedModuleModule,
        ClientModule,
        DxGanttModule,
        DxPieChartModule,
        DxiSeriesModule,
        DxoConnectorModule,
        DxoSizeModule,
        GanttModule,
        DxBoxModule,

    ],
    providers: [
        Service,
        TaskBoardComponent

    ],
})
export class ProjetModule { }
