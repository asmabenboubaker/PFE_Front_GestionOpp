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

}
