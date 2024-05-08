import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskServiceService} from "../../../../Service/task-service.service";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  @Output() add = new EventEmitter<boolean>();
  @Input() taskToEdit: any;

  statuses: string[] = ['a faire', 'en cours', 'fini'];
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,private taskService: TaskServiceService) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      subject: ['', Validators.required],
      priority: [''],
      status: ['', Validators.required],
      start_date: [''],
      end_date: [''],
      details: ['']
    });

    this.form = this.formBuilder.group({
      subject: [this.taskToEdit ? this.taskToEdit.subject : '', Validators.required],
      priority: [this.taskToEdit ? this.taskToEdit.priority : ''],
      status: [this.taskToEdit ? this.taskToEdit.status : '', Validators.required],
      start_date: [this.taskToEdit ? this.taskToEdit.start_date : ''],
      end_date: [this.taskToEdit ? this.taskToEdit.end_date : ''],
      details: [this.taskToEdit ? this.taskToEdit.details : '']
    });
  }
  Return(){
  this.add.emit(false)

   }

  // onSubmit(): void {
  //   // Call your service method to add the task
  //   this.taskService.addTask(this.form.value).subscribe(
  //       (response) => {
  //         console.log('Task added successfully:', response);
  //         // Refresh the task list or handle the response as needed
  //       },
  //       (error) => {
  //         console.error('Error adding task:', error);
  //       }
  //   );
  //
  //   // send  the form data to task board
  //   this.add.emit(this.form.value);
  //   // Emit an event to close the modal
  //
  // }
  //
  onSubmit(): void {
    if (this.taskToEdit) {
      // Call your service method to update the task
      this.taskService.updateTask(this.taskToEdit.id, this.form.value).subscribe(
          (response) => {
            console.log('Task updated successfully:', response);
            // Refresh the task list or handle the response as needed
          },
          (error) => {
            console.error('Error updating task:', error);
          }
      );
    } else {
      // Call your service method to add the task
      this.taskService.addTask(this.form.value).subscribe(
          (response) => {
            console.log('Task added successfully:', response);
            // Refresh the task list or handle the response as needed
          },
          (error) => {
            console.error('Error adding task:', error);
          }
      );
    }

    // Emit an event to close the modal
    this.add.emit(true);
  }

}
