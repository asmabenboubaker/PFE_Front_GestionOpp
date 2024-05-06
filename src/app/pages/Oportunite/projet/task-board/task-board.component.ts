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
    e.fromData.splice(e.fromIndex, 1);
    e.toData.splice(e.toIndex, 0, e.itemData);
  }
}
