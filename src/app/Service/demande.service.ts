import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Demande} from "../Models/Demande";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {WsService} from "../../ws.service";
import {EnvService} from "../../env.service";
import {TokenStorageService} from "../pages/Global/shared-service/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http: HttpClient,private Wservice: WsService,public env: EnvService,private httpclient: HttpClient,private tokenStorage: TokenStorageService) { }

  postDemandeWF(demande, authors, readers, description) {
    let params = new HttpParams();

    params = params.append("authors", authors);
    params = params.append("readers", readers);
    params = params.append("description", description);
    return this.httpclient.patch(`${this.env.piOpp}` + "submitDemande",

        demande, {params, headers: new HttpHeaders().set("Authorization", this.tokenStorage.getToken()).append("application", require('package.json').name)});

  }
  Initdemande() {
    return this.http.patch(this.env.piOpp + 'initDemande', {}, {headers: new HttpHeaders().set("Authorization", this.tokenStorage.getToken())});
  }
  Demande_process_Submit(obj) {
    return this.http.patch(this.env.piOpp + 'submitDemande', obj, {headers: new HttpHeaders().set("Authorization", this.tokenStorage.getToken())});
  }
  getDemandes(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.env.piOpp+this.Wservice.getdemandes);
  }

  // Get demande by ID
  getDemandeById(id): Observable<any> {
    const url = `${this.env.piOpp+this.Wservice.getdemandes}/byid/${id}`;
    return this.http.get<Demande>(url);
  }
getDemandeByid(id): Observable<any> {
    const url = `${this.env.piOpp}demandeDTO/${id}`;
    return this.http.get<any>(url);
    }
  // Add new demande
  addDemande(demande: Demande): Observable<Demande> {
    return this.http.post<Demande>(this.env.piOpp+this.Wservice.getdemandes, demande);
  }

  // Update demande
  updateDemande(id, demande: any): Observable<any> {
    const url = `${this.env.piOpp+this.Wservice.getdemandes}/${id}`;
    return this.http.put<any>(url, demande);
  }

  // Delete demande
  deleteDemande(id: number): Observable<void> {
    const url = `${this.env.piOpp+this.Wservice.getdemandes}/${id}`;
    return this.http.delete<void>(url);
  }

  getStatusList(): Observable<string[]> {
    return this.http.get<string[]>(`${this.env.piOpp}list`);
  }
  createDemandeAndAssignToClient(clientId: Number, demandeData: any): Observable<any> {
    const url = `${this.env.piOpp+this.Wservice.getdemandes}/client/${clientId}`;
    console.log(url);
    return this.http.post<any>(url, demandeData);
  }

  updateAndAssignToClient(clientId: number, demandeId: number, demandeData: any): Observable<any> {
    const url = `${this.env.piOpp}demandemm/${demandeId}/${clientId}`;
    return this.http.put<any>(url, demandeData);
  }
  //get by id demande
    getDemandeByidd(id): Observable<any> {
        const url = `${this.env.piOpp+this.Wservice.getdemandes}/byid/${id}`;
        return this.http.get<any>(url);
    }

  setCreateOppTrue(demandeId: number): Observable<any> {
    const url = `${this.env.piOpp}${demandeId}/setCreateOppTrue`;
    return this.http.put(url, {});
  }

  //list categories
    getCategories(): Observable<any[]> {
        return this.http.get<any[]>(`${this.env.piOpp+this.Wservice.getDomaines}/list`);
    }

  affecterDomaines(demandeId: number, domaineIds: number[]): Observable<any> {
    return this.http.post<any>(`${this.env.piOpp+this.Wservice.getdemandes}/${demandeId}/domaines`, domaineIds);
  }
}
