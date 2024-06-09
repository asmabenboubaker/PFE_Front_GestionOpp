import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WsService} from "../../ws.service";
import {EnvService} from "../../env.service";
import {TokenStorageService} from "../pages/Global/shared-service/token-storage.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor(private http: HttpClient,private Wservice: WsService,public env: EnvService,private tokenStorage: TokenStorageService) { }

  getFileItems(classeId:number,objectId:number): Observable<any[]> {
    const url = `${this.env.piOpp}getFilesByClassAndObject/${classeId}/${objectId}`;
   // const url = `${this.env.piOpp}getFilesByClassAndObject/27/407`;
    return this.http.get<any[]>(url);
  }
}
