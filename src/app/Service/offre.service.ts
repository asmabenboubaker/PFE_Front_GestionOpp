import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Offre} from "../Models/Offre";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {WsService} from "../../ws.service";
import {EnvService} from "../../env.service";
import {TokenStorageService} from "../pages/Global/shared-service/token-storage.service";
import {Client} from "../Models/Client";
import * as jsPDF from 'jspdf';
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
  InitOffre() {
    return this.http.patch(this.env.piOpp + 'initOffre', {}, {headers: new HttpHeaders().set("Authorization", this.tokenStorage.getToken())});
  }

  updateAndAssignToOpp(oppId: number, offreId: number, offreData: any): Observable<any> {
    const url = `${this.env.piOpp}offreupdate/${offreId}/${oppId}`;
    return this.http.put<any>(url, offreData);
  }
  Offre_process_Submit(obj) {
    return this.http.patch(this.env.piOpp + 'submitOffre', obj, {headers: new HttpHeaders().set("Authorization", this.tokenStorage.getToken())});
  }
  getAllOppWithoutPages(): Observable<Client[]> {
    const url = `${this.env.piOpp + this.Wservice.getOpp}/withoutpage`;
    return this.http.get<Client[]>(url);
  }
  getOffreByid(id): Observable<any> {
    const url = `${this.env.piOpp}offreById/${id}`;
    return this.http.get<any>(url);
  }
  generatePdf(formData: any) {
    const doc = new jsPDF.default();
    // Generate PDF content based on formData
    doc.text('Hello, World!', 10, 10);
    // Save the PDF
    doc.save('example.pdf');
  }
  constructor(private http: HttpClient,private Wservice: WsService,public env: EnvService,private tokenStorage: TokenStorageService) { }
}
