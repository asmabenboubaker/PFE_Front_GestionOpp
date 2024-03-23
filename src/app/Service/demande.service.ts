import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Demande} from "../Models/Demande";
import {HttpClient} from "@angular/common/http";
import {WsService} from "../../ws.service";
import {EnvService} from "../../env.service";

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http: HttpClient,private Wservice: WsService,public env: EnvService) { }
  getDemandes(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.env.piOpp+this.Wservice.getdemandes);
  }

  // Get demande by ID
  getDemandeById(id): Observable<Demande> {
    const url = `${this.env.piOpp+this.Wservice.getdemandes}/byid/${id}`;
    return this.http.get<Demande>(url);
  }

  // Add new demande
  addDemande(demande: Demande): Observable<Demande> {
    return this.http.post<Demande>(this.env.piOpp+this.Wservice.getdemandes, demande);
  }

  // Update demande
  updateDemande(id, demande: Demande): Observable<Demande> {
    const url = `${this.env.piOpp+this.Wservice.getdemandes}/${id}`;
    return this.http.put<Demande>(url, demande);
  }

  // Delete demande
  deleteDemande(id: number): Observable<void> {
    const url = `${this.env.piOpp+this.Wservice.getdemandes}/${id}`;
    return this.http.delete<void>(url);
  }

  getStatusList(): Observable<string[]> {
    return this.http.get<string[]>(`${this.env.piOpp}list`);
  }
  createDemandeAndAssignToClient(clientId: Number, demandeData: Demande): Observable<any> {
    const url = `${this.env.piOpp+this.Wservice.getdemandes}/client?clientId=${clientId}`;
    console.log(url);
    return this.http.post<any>(url, demandeData);
  }
}
