import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WsService} from "../../ws.service";
import {EnvService} from "../../env.service";
import {TokenStorageService} from "../pages/Global/shared-service/token-storage.service";
import {Observable} from "rxjs";
import {Demande} from "../Models/Demande";

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private http: HttpClient,private Wservice: WsService,public env: EnvService,private httpclient: HttpClient,private tokenStorage: TokenStorageService) { }

  generateInvoice(): Observable<any> {
    return this.http.get<any>(`${this.env.piOpp}/generateInvoice`);
  }
  addFacture(facture: any): Observable<any> {
    return this.http.post<any>(this.env.piOpp+this.Wservice.getFacture, facture);
  }
  deleteFacture(id: number): Observable<void> {
    const url = `${this.env.piOpp+this.Wservice.getFacture}/${id}`;
    return this.http.delete<void>(url);
  }
  getFactureById(id: number): Observable<any> {
    return this.http.get<any>(`${this.env.piOpp+this.Wservice.getFacture}/invoiceItems/${id}`);
  }
  // get list item by id facture
    getItemsByFactureId(id: number): Observable<any> {
        return this.http.get<any>(`${this.env.piOpp+this.Wservice.getFacture}/items/${id}`);
    }

  addAndAssignFacture(facture: any, clientId: number): Observable<any> {
    return this.http.post(`${this.env.piOpp}saveFactureWithItems2/${clientId}`, facture);
  }
  //update facture et affecter client
    updateAndAssignFacture(facture: any, clientId: number,factureId: number): Observable<any> {
        return this.http.put(`${this.env.piOpp+this.Wservice.getFacture}/updateFacture/${factureId}/${clientId}`, facture);
    }

}
