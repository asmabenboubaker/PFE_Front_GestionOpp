import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {WsService} from "../../ws.service";
import {EnvService} from "../../env.service";
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http: HttpClient,private Wservice: WsService,public env: EnvService) { }

    getTasks(): Observable<any> {
        return this.http.get(this.env.piOpp + this.Wservice.getTask);
    }
    //Add task
    addTask(data:any): Observable<any> {
        return this.http.post(this.env.piOpp + this.Wservice.getTask, data);
    }

  getTasksByStatus(status: string): Observable<any> {

    return this.http.get(this.env.piOpp + this.Wservice.getTask)
        .pipe(
            map((tasks: any[]) => tasks.filter(task => task.Task_Status === status))
        );
  }

    // updateTaskStatus(taskId: number, status: string): Observable<Task> {
    //     return this.http.put<Task>(`${this.env.piOpp + this.Wservice.getTask}/${taskId}/status`, { status });
    // }
    updateTaskStatus(taskId: number, newStatus: string): Observable<any> {
        const url = `${this.env.piOpp + this.Wservice.getTask}/${taskId}/${newStatus}/status`;
        return this.http.put<any>(url, null);
    }
    //delete task
    deleteTask(taskId: number): Observable<any> {
        return this.http.delete(`${this.env.piOpp + this.Wservice.getTask}/${taskId}`);
    }
    // update task
    updateTask(taskId: number, data: any): Observable<any> {
        return this.http.put(`${this.env.piOpp + this.Wservice.getTask}/${taskId}`, data);
    }
    //get task by id
    getTaskById(taskId: number): Observable<any> {
        return this.http.get(`${this.env.piOpp + this.Wservice.getTask}/${taskId}`);
    }
}
