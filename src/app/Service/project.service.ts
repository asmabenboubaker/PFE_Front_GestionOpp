import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {WsService} from "../../ws.service";
import {EnvService} from "../../env.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
     apiUrl='http://localhost:8085/rest/api/2/project'
 //apiUrl='https://boubaker-asma.atlassian.net/rest/api/2/project'
  constructor(private http: HttpClient,private Wservice: WsService,public env: EnvService) { }
    csrfToken: string | null = null;
    createProject(projectData: any): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Basic YXNtYWJvdWJha2VyOmdvdDdsZWVtaW5obw==',
            'Content-Type': 'application/json',
            'X-atlassian-token': 'no-check',
          


        });

        return this.http.post<any>(this.apiUrl, projectData, { headers, withCredentials: true });
    }

    // Méthode pour récupérer le jeton CSRF à partir des cookies
    getCSRFTokenFromCookies(): void {
        this.csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/, "$1");
    }
    //get list projects
    getprojets(): Observable<any[]> {
        return this.http.get<any[]>(`${this.env.piOpp}projetslist`);
    }
}
