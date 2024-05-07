import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Client} from "../Models/Client";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {WsService} from "../../ws.service";
import {EnvService} from "../../env.service";
import {TokenStorageService} from "../pages/Global/shared-service/token-storage.service";

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
}
