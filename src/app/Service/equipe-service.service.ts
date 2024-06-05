import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WsService} from "../../ws.service";
import {EnvService} from "../../env.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EquipeServiceService {

  constructor(private http: HttpClient,private Wservice: WsService,public env: EnvService) { }
  // get list equipe
    getEquipes(): Observable<any[]> {
   const url='https://kernel.picosoft.biz/kernel-v1/api/departments';
        return this.http.get<any[]>(url);
    }

  affecterEquipe(equipeId: number, idsEquipes: number[]): Observable<any> {
    const url = `${this.env.piOpp}${this.Wservice.getEquipe}/${equipeId}/oppequipes`;
    return this.http.post<any>(url, idsEquipes);
  }
}
