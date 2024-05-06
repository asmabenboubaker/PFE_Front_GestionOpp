import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {WsService} from "../../ws.service";
import {EnvService} from "../../env.service";

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http: HttpClient,private Wservice: WsService,public env: EnvService) { }


  public getTasks = (): Observable<any[]> =>
      this.http.get<any[]>(`${this.env.piOpp + this.Wservice.getTask}`);
}
