import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {WsService} from "../../ws.service";
import {EnvService} from "../../env.service";
import {Observable} from "rxjs";
import {Opportunite} from "../Models/Opportunite";
import {TokenStorageService} from "../pages/Global/shared-service/token-storage.service";
import {Client} from "../Models/Client";

@Injectable({
  providedIn: 'root'
})
export class OpportuniteService {

  constructor(private http: HttpClient,private Wservice: WsService,public env: EnvService,private tokenStorage: TokenStorageService) { }
  getOpportunites(): Observable<Opportunite[]> {
    return this.http.get<Opportunite[]>(this.env.piOpp+this.Wservice.getOpp);
  }

  getOpportuniteById(id: number): Observable<Opportunite> {
    const url = `${this.env.piOpp+this.Wservice.getOpp}/${id}`;
    return this.http.get<Opportunite>(url);
  }

  addOpportunite(opportunite: Opportunite): Observable<Opportunite> {
    return this.http.post<Opportunite>(this.env.piOpp+this.Wservice.getOpp, opportunite);
  }

  updateOpportunite(opportunite: Opportunite): Observable<Opportunite> {
    const url = `${this.env.piOpp+this.Wservice.getOpp}/${opportunite.id}`;
    return this.http.put<Opportunite>(url, opportunite);
  }

  deleteOpportunite(id: number): Observable<void> {
    const url = `${this.env.piOpp+this.Wservice.getOpp}/${id}`;
    return this.http.delete<void>(url);
  }
  // delete opportunité
    deleteOpportuniteById(id: number): Observable<void> {
        const url = `${this.env.piOpp+this.Wservice.getOpp}/${id}`;
        return this.http.delete<void>(url);
    }
  InitOpp() {
    return this.http.patch(this.env.piOpp + 'initOpp', {}, {headers: new HttpHeaders().set("Authorization", this.tokenStorage.getToken())});
  }
  getOppByid(id): Observable<any> {
    const url = `${this.env.piOpp}OpportuniteDTO/${id}`;
    return this.http.get<any>(url);
  }
  Opp_process_Submit(obj) {
    return this.http.patch(this.env.piOpp + 'submitOpp', obj, {headers: new HttpHeaders().set("Authorization", this.tokenStorage.getToken())});
  }
  updateAndAssignToDemande(OppId: number, deId: number, oppData: any): Observable<any> {
    const url = `${this.env.piOpp}updateOpp/${OppId}/${deId}`;
    return this.http.put<any>(url, oppData);
  }
  getAllDemandesWithoutPages(): Observable<Client[]> {
    const url = `${this.env.piOpp + this.Wservice.getdemandes}/WithoutPages`;
    return this.http.get<Client[]>(url);
  }
}
