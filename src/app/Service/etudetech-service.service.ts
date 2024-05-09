import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WsService} from "../../ws.service";
import {EnvService} from "../../env.service";

@Injectable({
  providedIn: 'root'
})
export class EtudetechServiceService {

  constructor(private http: HttpClient,private Wservice: WsService,public env: EnvService) { }

  //get list etudetech
    getEtudetechs() {
        return this.http.get(this.env.piOpp+this.Wservice.getEtudetech);
    }
    //add etudetech
    addEtudetech(etudetech) {
        return this.http.post(this.env.piOpp+this.Wservice.getEtudetech, etudetech);
    }
    //create EtudeOpp and Affectater opp
    createEtudeOpp(etudeOpp,oppId) {
        return this.http.post(`${this.env.piOpp}createEtudeOppWithAffectation/${oppId}`, etudeOpp);
    }

}
