import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskServiceService} from "../../../../Service/task-service.service";
import {Client} from "../../../../Models/Client";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit,OnChanges {
  @Output() add = new EventEmitter<any>();
  @Input() taskToEdit: any;
  @Input() id: string;
  idprojet: any;
  statuses: string[] = ['a faire', 'en cours', 'fini'];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private taskService: TaskServiceService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idprojet = this.route.snapshot.paramMap.get('id');
    this.form = this.formBuilder.group({
      subject: ['', Validators.required],
      priority: [''],
      status: ['', Validators.required],
      start_date: [''],
      end_date: [''],
      details: ['']
    });

    if (this.taskToEdit) {
      this.form.patchValue({
        subject: this.taskToEdit.subject,
        priority: this.taskToEdit.priority,
        status: this.taskToEdit.status,
        start_date: this.taskToEdit.start_date,
        end_date: this.taskToEdit.end_date,
        details: this.taskToEdit.details
      });
    }
  }

  Return() {
    this.add.emit(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changinID(changes.id.currentValue);
  }

  changinID(id) {
    if (this.id) {
      const clientId = +this.id;
      this.taskService.getTaskById(clientId).subscribe(
          (client) => {
            this.form.patchValue(client);
          },
          (error) => {
            console.error('Error fetching client details:', error);
          }
      );
    }
  }

  onSubmit(): void {
    if (this.id) {
      // Update task
      this.taskService.updateTask(+this.id, this.form.value).subscribe(
          (response) => {
            console.log('Task updated successfully:', response);
          },
          (error) => {
            console.error('Error updating task:', error);
          }
      );
    } else {
      // Add task
      this.taskService.addTask(this.form.value, this.idprojet).subscribe(
          (response) => {
            console.log('Task added successfully:', response);
            // Emit the newly created task data
            this.add.emit(response);
          },
          (error) => {
            console.error('Error adding task:', error);
          }
      );
    }

    // Close the modal
    this.add.emit(false);
  }
}
