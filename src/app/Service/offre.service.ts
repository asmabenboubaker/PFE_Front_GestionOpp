import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Offre} from "../Models/Offre";
import {HttpClient} from "@angular/common/http";
import {WsService} from "../../ws.service";
import {EnvService} from "../../env.service";

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  getOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(this.env.piOpp+this.Wservice.getoffre);
  }

  getOffreById(id: number): Observable<Offre> {
    const url = `${this.env.piOpp+this.Wservice.getoffre}/${id}`;
    return this.http.get<Offre>(url);
  }

  addOffre(offre: Offre): Observable<Offre> {
    return this.http.post<Offre>(this.env.piOpp+this.Wservice.getoffre, offre);
  }

  updateOffre(offre: Offre): Observable<Offre> {
    const url = `${this.env.piOpp+this.Wservice.getoffre}/${offre.id}`;
    return this.http.put<Offre>(url, offre);
  }

  deleteOffre(id: number): Observable<void> {
    const url = `${this.env.piOpp+this.Wservice.getoffre}/${id}`;
    return this.http.delete<void>(url);
  }
  constructor(private http: HttpClient,private Wservice: WsService,public env: EnvService) { }
}
