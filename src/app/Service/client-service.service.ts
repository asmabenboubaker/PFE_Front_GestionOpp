import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../Models/Client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  private  api = 'http://localhost:8888/demo_war/api/clients'; 
 
  constructor(private http: HttpClient) { }

    getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.api);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.api, client);
  }
  getClientById(clientId: number): Observable<Client> {
    const url = `${this.api}/${clientId}`;
    return this.http.get<Client>(url);
  }
}
