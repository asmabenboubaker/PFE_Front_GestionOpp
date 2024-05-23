import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DxSortableComponent, DxSortableTypes} from 'devextreme-angular/ui/sortable';
import { Employee, Task, Service } from './app.service';
import { TaskServiceService } from "../../../../Service/task-service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {
  taskToEdit
  popupTitle
  popupVisibleedit=false
  editTask(task: any): void {
    console.log("task"+task);
    this.taskToEdit = task;
    this.popupTitle = "Edit Task";
    this.popupVisibleedit = true;
  }
  @ViewChild(DxSortableComponent, { static: false }) sortable: DxSortableComponent;

  @Input() dataSource: any[];

  addTaskEvent: EventEmitter<any> = new EventEmitter<any>();
  lists: any[][] = [];
  statuses = ['a faire', 'en cours', 'fini'];
  employees: Record<'ID', Employee> | {} = {};
  popupVisible = false;
  idprojet: any;
  constructor(private service: Service, private taskService: TaskServiceService,public route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.service.getEmployees().forEach((employee) => {
    //   this.employees[employee.ID] = employee.Name;
    // });
    this.idprojet=this.route.snapshot.paramMap.get('id');
    this.taskService.getTasks(this.idprojet).subscribe(tasks => {
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
  togglePopup(){
    // change  boolean to true
    this.popupVisible = true;
  }


  // Handle the emitted task data
  addTask(taskData: any) {
    // Push the new task into the appropriate list based on its status
    const listIndex = this.statuses.findIndex(status => status === taskData.status);
    if (listIndex !== -1) {
      this.lists[listIndex].push(taskData);
    }
    // close popup
    this.popupVisible = false;
  }
  add(e){
    this.popupVisible = e

    this.refresh()
  }
  refresh(): void {
    this.sortable.instance.update();
  }
  deletetask(id: number){
    this.deleteTaskLocally(id);
    this.taskService.deleteTask(id).subscribe(
        (response) => {
          console.log('Task deleted successfully:', response);
          this.refresh();
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
    );

  }
  deleteTaskLocally(id: number) {
    // Find and remove the task from the lists
    this.lists.forEach((list) => {
      const index = list.findIndex(task => task.id === id);
      if (index !== -1) {
        list.splice(index, 1);
      }
    });
  }
  id
  popupEdit
  Editclient(id) {
    this.id = id
    console.log(this.id)
    this.popupEdit = true

  }

}
