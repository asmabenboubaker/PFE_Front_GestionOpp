import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {WsService} from "../../ws.service";
import {EnvService} from "../../env.service";
import {Observable} from "rxjs";

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
    // createEtudeOpp(etudeOpp,oppId) {
    //     return this.http.post(`${this.env.piOpp}createEtudeOppWithAffectation/${oppId}`, etudeOpp);
    // }
    createEtudeOpp(etudeOpp, oppId) {
        console.log('Sending object:', etudeOpp);

        return this.http.put(`${this.env.piOpp}createEtudeOppWithAffectation/${oppId}`, etudeOpp);
    }
    getAllEtudesByOpportuniteId(opportuniteId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.env.piOpp}opportunite/${opportuniteId}/etudes`);
    }
    //add tachetoetude
    addTachetoetude(etudeId: number, tacheOpp: any) {
        const url = `${this.env.piOpp}etudes/${etudeId}/taches`;
        return this.http.post(url, tacheOpp);
    }
    getTachesByEtudeId(etudeId: number): Observable<any[]> {
        const url = `${this.env.piOpp}etudes/${etudeId}/taches`;
        return this.http.get<any[]>(url);
    }

}
