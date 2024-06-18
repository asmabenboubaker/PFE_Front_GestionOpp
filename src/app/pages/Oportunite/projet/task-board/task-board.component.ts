import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DxSortableComponent, DxSortableTypes} from 'devextreme-angular/ui/sortable';
import { Employee, Task, Service } from './app.service';
import { TaskServiceService } from "../../../../Service/task-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {

  @ViewChild(DxSortableComponent, { static: false }) sortable: DxSortableComponent;
  @Input() dataSource: any[];
  taskToEdit;
  popupTitle;
  popupVisibleedit = false;
  addTaskEvent: EventEmitter<any> = new EventEmitter<any>();
  lists: any[][] = [];
  statuses = ['a faire', 'en cours', 'fini'];
  employees: Record<'ID', Employee> | {} = {};
  popupVisible = false;
  idprojet: any;
  id;
  popupEdit;

  constructor(private taskService: TaskServiceService, public route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.idprojet = this.route.snapshot.paramMap.get('id');
    this.taskService.getTasks(this.idprojet).subscribe(tasks => {
      this.statuses.forEach((status) => {
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
    const updatedTask = e.itemData;
    const toListIndex = this.lists.findIndex((list) => list === e.toData);
    updatedTask.status = this.statuses[toListIndex];

    this.taskService.updateTaskStatus(updatedTask.id, updatedTask.status).subscribe(
        (response) => {
          console.log('Task status updated successfully:', response);
        },
        (error) => {
          console.error('Error updating task status:', error);
        }
    );

    e.fromData.splice(e.fromIndex, 1);
    e.toData.splice(e.toIndex, 0, e.itemData);
  }

  togglePopup() {
    this.popupVisible = !this.popupVisible;
  }

  // Handle the emitted task data
  addTask(taskData: any) {
    const listIndex = this.statuses.findIndex(status => status === taskData.status);
    if (listIndex !== -1) {
      this.lists[listIndex].push(taskData);
    }
    this.popupVisible = false;
  }

  add(e) {
    this.popupVisible = e;
    this.refresh();
  }

  refresh(): void {
    this.sortable.instance.update();
  }

  deletetask(id: number) {
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
    this.lists.forEach((list) => {
      const index = list.findIndex(task => task.id === id);
      if (index !== -1) {
        list.splice(index, 1);
      }
    });
  }

  Editclient(id) {
    this.id = id;
    this.popupEdit = true;
  }

  backButtonOptions = {
    icon: 'back',
    onClick: () => {
      this.router.navigate(['/projet/allproject']);
    }
  };

  addButtonOptions = {
    icon: 'plus',
    text: 'Add Task',
    onClick: () => {
      this.togglePopup();
    }
  };
}
