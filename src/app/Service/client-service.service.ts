import {ChangeDetectorRef, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../Models/Client';
import { HttpClient } from '@angular/common/http';
import {WsService} from "../../ws.service";
import {FormBuilder} from "@angular/forms";
import {EnvService} from "../../env.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../pages/Global/shared-service/token-storage.service";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private http: HttpClient,private Wservice: WsService,public env: EnvService) { }

    getClients(): Observable<any[]> {
    return this.http.get<any[]>(this.env.piOpp+this.Wservice.getClient);
  }
  getAllClientsWithoutPages(): Observable<any[]> {
    const url = `${this.env.piOpp + this.Wservice.getClient}/WithoutPages`;
    return this.http.get<any[]>(url);
  }
  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.env.piOpp+this.Wservice.getClient, client);
  }
  getClientById(clientId: number): Observable<Client> {
    const url = `${this.env.piOpp+this.Wservice.getClient}/${clientId}`;
    return this.http.get<Client>(url);
  }
  updateClient(client: Client,id): Observable<Client> {
    return this.http.put<Client>(`${this.env.piOpp+this.Wservice.getClient}/${id}`, client);
  }
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.env.piOpp}${this.Wservice.getClient}/${id}`);
  }
  private geocodeUrl = 'https://nominatim.openstreetmap.org/search';


  getCoordinates(address: string): Observable<any> {
    return this.http.get<any>(`${this.geocodeUrl}?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1`);
  }
// count clients api
    countClient(): Observable<any> {
        return this.http.get<any>(`${this.env.piOpp+this.Wservice.getClient}/count`);
    }


}
