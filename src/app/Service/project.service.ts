import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {WsService} from "../../ws.service";
import {EnvService} from "../../env.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
     apiUrl='http://localhost:8888/demo_war/'
 //apiUrl='https://boubaker-asma.atlassian.net/rest/api/2/project'
  constructor(private http: HttpClient,private Wservice: WsService,public env: EnvService) { }
    csrfToken: string | null = null;
    // createProject(projectData: any): Observable<any> {
    //     const headers = new HttpHeaders({
    //         'Authorization': 'Basic YXNtYWJvdWJha2VyMTFAZ21haWwuY29tOkFUQVRUM3hGZkdGMGFCSGxQQy1hWXkyNnJhS2tuMUZndDVMMG5rM3ZDODc1eld6cGdvWGJrRWh6Q2NSQjlJcnZEQUZGaktFTWNyaWc1emxVWVVkc0hBOW5MOVJfWHI3dUVSeXZpWUhCZGFONUxjdElGWHB3Zlg3VFNvcExIY2o2a2dlb0R4UkJ0LWJrQzgzVTVINGlsaHV5LVgtWWVvZ2FLSjlGUzAzd0NuU0pqSndvRWVObzFNQT0xRDkwNjE3MQ==',
    //         'Content-Type': 'application/json',
    //         'X-atlassian-token': 'no-check',
    //
    //     });
    //
    //     return this.http.post<any>(this.apiUrl, projectData, { headers, withCredentials: true });
    // }
    createProject(projectData: any): Observable<any> {
        const url = `${this.apiUrl}create-project`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
            // You can add additional headers if needed
        });

        return this.http.post<any>(url, projectData, { headers }).pipe(
            catchError(this.handleError)
        );
    }
    // add project
    addProject(project: any): Observable<any> {
        return this.http.post<any>(`${this.env.piOpp}projets`, project);
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // Return an observable with a user-facing error message.
        return throwError('Something bad happened; please try again later.');
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
