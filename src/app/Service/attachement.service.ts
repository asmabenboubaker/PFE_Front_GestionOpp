import { Injectable } from '@angular/core';
import {EnvService} from "../../env.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../pages/Global/shared-service/token-storage.service";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AttachementService {
  private headers: HttpHeaders;
  constructor(private env: EnvService, private httpClient: HttpClient, private tokenStorage: TokenStorageService, private cookieService: CookieService) {
    this.headers = new HttpHeaders().set("Authorization", this.tokenStorage.getToken()).append("application", require('package.json').name)
  }

  extractfileByUIID(uuid, fileAccessToken): Observable<any> {
    return this.httpClient.get(`${this.env.apiUrlkernel}` + "extractAttachment/" +  "?uuid="+ uuid + "&fileAccessToken=" + fileAccessToken, {
      headers: this.headers,
      responseType: 'arraybuffer' as 'json',
      observe: 'response', // simply add this option
    });
  }
  createAttachement(obj, fileAccessToken) {
    return this.httpClient.post(`${this.env.apiUrlkernel}` + 'createAttachement' + "&fileAccessToken=" + fileAccessToken, obj, {
          headers: this.headers,
        }
    )
  }
}
