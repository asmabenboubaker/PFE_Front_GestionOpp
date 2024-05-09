import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WsService} from "../../ws.service";
import {EnvService} from "../../env.service";

@Injectable({
  providedIn: 'root'
})
export class EquipeServiceService {

  constructor(private http: HttpClient,private Wservice: WsService,public env: EnvService) { }
  // get list equipe
    getEquipes() {
        return this.http.get(this.env.piOpp+this.Wservice.getEquipe);
    }
}
