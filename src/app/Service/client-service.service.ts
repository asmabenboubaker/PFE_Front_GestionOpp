import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../Models/Client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  private getApi = 'http://localhost:8888/demo_war/api/clients'; 
  constructor(private http: HttpClient) { }

    getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.getApi);
  }
}
