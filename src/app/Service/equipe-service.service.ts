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
    getEquipes() {
        return this.http.get(this.env.piOpp+this.Wservice.getEquipe);
    }
  affecterEquipe(equipeId: number, idsEquipes: number[]): Observable<any> {
    const url = `${this.env.piOpp}${this.Wservice.getEquipe}/${equipeId}/oppequipes`;
    return this.http.post<any>(url, idsEquipes);
  }
}
