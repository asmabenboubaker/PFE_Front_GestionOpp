import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskServiceService} from "../../../../Service/task-service.service";
import {Client} from "../../../../Models/Client";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit,OnChanges {
  @Output() add = new EventEmitter<boolean>();
  @Input() taskToEdit: any;
  @Input() id: string;

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
console.log("taskToEdit",this.taskToEdit);
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
  Return(){
  this.add.emit(false)

   }
  ngOnChanges(changes: SimpleChanges): void {
    this.changinID(changes.id.currentValue);
  }
  changinID(id){
    if (this.id) {
      const clientId = +this.id;
      this.taskService.getTaskById(clientId).subscribe(
          (client: Client) => {

            this.form.patchValue(client);
          },
          (error) => {
            console.error('Error fetching client details:', error);
          }
      );
    }
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
    if (this.id) {
      // Call your service method to update the task
      this.taskService.updateTask(+this.id, this.form.value).subscribe(
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
    this.add.emit(false);
  }

}
