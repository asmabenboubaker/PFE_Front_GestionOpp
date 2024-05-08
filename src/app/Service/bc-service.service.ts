import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Client} from "../Models/Client";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {WsService} from "../../ws.service";
import {EnvService} from "../../env.service";
import {TokenStorageService} from "../pages/Global/shared-service/token-storage.service";
import {Demande} from "../Models/Demande";

@Injectable({
  providedIn: 'root'
})
export class BcServiceService {

  constructor(private http: HttpClient,private Wservice: WsService,public env: EnvService,private httpclient: HttpClient,private tokenStorage: TokenStorageService) { }

  getAllbc(): Observable<any[]> {
    return this.http.get<Client[]>(this.env.piOpp+this.Wservice.getBc);
  }
  InitBC() {
    return this.http.patch(this.env.piOpp + 'initBC', {}, {headers: new HttpHeaders().set("Authorization", this.tokenStorage.getToken())});
  }
  //delete BC
    deleteBC(id: number): Observable<void> {
        return this.http.delete<void>(`${this.env.piOpp}${this.Wservice.getBc}/${id}`);
    }
  getStatusList(): Observable<string[]> {
    return this.http.get<string[]>(`${this.env.piOpp}listbc`);
  }

  getbcById(id): Observable<any> {
    const url = `${this.env.piOpp}BondecommandeByid/${id}`;
    return this.http.get<any>(url);
  }
  BC_process_Submit(obj) {
    return this.http.patch(this.env.piOpp + 'submitBC', obj, {headers: new HttpHeaders().set("Authorization", this.tokenStorage.getToken())});
  }
}
