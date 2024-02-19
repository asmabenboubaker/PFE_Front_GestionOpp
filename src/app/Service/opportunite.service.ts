import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WsService} from "../../ws.service";
import {EnvService} from "../../env.service";
import {Observable} from "rxjs";
import {Opportunite} from "../Models/Opportunite";

@Injectable({
  providedIn: 'root'
})
export class OpportuniteService {

  constructor(private http: HttpClient,private Wservice: WsService,public env: EnvService) { }
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
}
