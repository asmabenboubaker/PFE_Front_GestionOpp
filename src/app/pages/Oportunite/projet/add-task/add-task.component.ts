import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskServiceService} from "../../../../Service/task-service.service";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  @Output() add = new EventEmitter<boolean>();


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
      description: ['']
    });
  }
  Return(){
  this.add.emit(false)

   }

  onSubmit(): void {
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

    // send  the form data to task board
    this.add.emit(false);
    // Emit an event to close the modal

  }



}
