import { Component, OnInit } from '@angular/core';
import { DxSortableTypes } from 'devextreme-angular/ui/sortable';
import { Employee, Task, Service } from './app.service';
import { TaskServiceService } from "../../../../Service/task-service.service";

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {
  lists: Task[][] = [];
  statuses = ['a faire', 'en cours', 'fini'];
  employees: Record<'ID', Employee> | {} = {};

  constructor(private service: Service, private taskService: TaskServiceService) {}

  ngOnInit(): void {
    // this.service.getEmployees().forEach((employee) => {
    //   this.employees[employee.ID] = employee.Name;
    // });

    this.taskService.getTasks().subscribe(tasks => {
      this.statuses.forEach((status) => {
        console.log(tasks);
        const filteredTasks = tasks.filter((task) => task.status === status);
        this.lists.push(filteredTasks);
      });
    });
  }

  onListReorder(e: DxSortableTypes.ReorderEvent) {
    const list = this.lists.splice(e.fromIndex, 1)[0];
    this.lists.splice(e.toIndex, 0, list);

    const status = this.statuses.splice(e.fromIndex, 1)[0];
    this.statuses.splice(e.toIndex, 0, status);
  }

  onTaskDragStart(e: DxSortableTypes.DragStartEvent) {
    e.itemData = e.fromData[e.fromIndex];
  }

   onTaskDrop(e: DxSortableTypes.AddEvent) {
     console.log(e.itemData);
     console.log( e);
     const updatedTask = e.itemData;
     console.log(updatedTask.status);

     console.log("=================================")

     const toListIndex = this.lists.findIndex((list) => list === e.toData);
     updatedTask.status = this.statuses[toListIndex];
     console.log(updatedTask.status);

     this.taskService.updateTaskStatus(updatedTask.id, updatedTask.status).subscribe(
         (response) => {
            console.log('Task status updated successfully:', response);
         },
         (error) => {
            console.error('Error updating task status:', error);
      });


     e.fromData.splice(e.fromIndex, 1);
     e.toData.splice(e.toIndex, 0, e.itemData);



   }
 /* onTaskDrop(e: DxSortableTypes.AddEvent) {
    console.log("task id");

   const updatedTask = e.itemData;
   const taskId = updatedTask.id;
   console.log(updatedTask);
   console.log(e);
   updatedTask.status = this.statuses[e.toIndex]; // Update the status of the dropped task
   console.log(updatedTask.status);
   // Send an HTTP request to update the task's status in the database
   this.taskService.updateTaskStatus(taskId, updatedTask.status).subscribe(
       (response) => {
         console.log('Task status updated successfully:', response);
       },
       (error) => {
         console.error('Error updating task status:', error);
   });

    // Remove the task from its original position
    e.fromData.splice(e.fromIndex, 1);
    // Add the task to its new position
    e.toData.splice(e.toIndex, 0, updatedTask);
  }
*/

}
