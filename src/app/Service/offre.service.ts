import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Offre} from "../Models/Offre";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {WsService} from "../../ws.service";
import {EnvService} from "../../env.service";
import {TokenStorageService} from "../pages/Global/shared-service/token-storage.service";
import {Client} from "../Models/Client";
import * as jsPDF from 'jspdf';

import autoTable from 'jspdf-autotable';
@Injectable({
  providedIn: 'root'
})
export class OffreService {
  getOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(this.env.piOpp+this.Wservice.getoffre);
  }

  getOffreById(id: number): Observable<Offre> {
    const url = `${this.env.piOpp+this.Wservice.getoffre}/${id}`;
    return this.http.get<Offre>(url);
  }

  addOffre(offre: Offre): Observable<Offre> {
    return this.http.post<Offre>(this.env.piOpp+this.Wservice.getoffre, offre);
  }

  updateOffre(offre: Offre): Observable<Offre> {
    const url = `${this.env.piOpp+this.Wservice.getoffre}/${offre.id}`;
    return this.http.put<Offre>(url, offre);
  }

  deleteOffre(id: number): Observable<void> {
    const url = `${this.env.piOpp+this.Wservice.getoffre}/${id}`;
    return this.http.delete<void>(url);
  }
  InitOffre() {
    return this.http.patch(this.env.piOpp + 'initOffre', {}, {headers: new HttpHeaders().set("Authorization", this.tokenStorage.getToken())});
  }

  updateAndAssignToOpp(oppId: number, offreId: number, offreData: any): Observable<any> {
    const url = `${this.env.piOpp}offreupdate/${offreId}/${oppId}`;
    return this.http.put<any>(url, offreData);
  }
  Offre_process_Submit(obj) {
    return this.http.patch(this.env.piOpp + 'submitOffre', obj, {headers: new HttpHeaders().set("Authorization", this.tokenStorage.getToken())});
  }
  getAllOppWithoutPages(): Observable<Client[]> {
    const url = `${this.env.piOpp + this.Wservice.getOpp}/withoutpage`;
    return this.http.get<Client[]>(url);
  }
  getOffreByid(id): Observable<any> {
    const url = `${this.env.piOpp}offreById/${id}`;
    return this.http.get<any>(url);
  }
  generatePdf(formData: any) {
    const doc = new jsPDF.default();
  // date d'aujourd'hui only date

    const today = new Date().toLocaleDateString();
    autoTable(doc, {
      body: [
        [
          {
            content: 'Picosoft',
            styles: {
              halign: 'left',
              fontSize: 20,
              textColor: '#ffffff'
            }
          },
          {
            content: 'Offre de Prix',
            styles: {
              halign: 'right',
              fontSize: 20,
              textColor: '#ffffff'
            }
          }
        ],
      ],
      theme: 'plain',
      styles: {
        fillColor: '#67282d'
      }
    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Reference: #INV0001'
                +'\nDate:'+today
                +'\nMode de paiement: '+formData.modePaiement,
            styles: {
              halign: 'right'
            }
          }
        ],
      ],
      theme: 'plain'
    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Billed to:'
                +'\nJohn Doe'
                +'\nBilling Address line 1'
                +'\nBilling Address line 2'
                +'\nZip code - City'
                +'\nCountry',
            styles: {
              halign: 'left'
            }
          },
          {
            content: 'Shipping address:'
                +'\nJohn Doe'
                +'\nShipping Address line 1'
                +'\nShipping Address line 2'
                +'\nZip code - City'
                +'\nCountry',
            styles: {
              halign: 'left'
            }
          },
          {
            content: 'From:'
                +'\nCompany name'
                +'\nShipping Address line 1'
                +'\nShipping Address line 2'
                +'\nZip code - City'
                +'\nCountry',
            styles: {
              halign: 'right'
            }
          }
        ],
      ],
      theme: 'plain'
    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Montant',
            styles: {
              halign:'right',
              fontSize: 14
            }
          }
        ],
        [
          {

            content: formData.montant,
            styles: {
              halign:'right',
              fontSize: 20,
              textColor: '#0d39e3'
            }
          }
        ],
        [
          {
            content: 'Due date:'+today,
            styles: {
              halign:'right'
            }
          }
        ]
      ],
      theme: 'plain'
    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Products & Services',
            styles: {
              halign:'left',
              fontSize: 14
            }
          }
        ]
      ],
      theme: 'plain'
    });

    autoTable(doc, {
      head: [['Items', 'Category', 'Quantity', 'Price', 'Tax', 'Amount']],
      body: [
        ['Product or service name', 'Category', '2', '$450', '$50', '$1000'],
        ['Product or service name', 'Category', '2', '$450', '$50', '$1000'],
        ['Product or service name', 'Category', '2', '$450', '$50', '$1000'],
        ['Product or service name', 'Category', '2', '$450', '$50', '$1000']
      ],
      theme: 'striped',
      headStyles:{
        fillColor: '#343a40'
      }
    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Subtotal:',
            styles:{
              halign:'right'
            }
          },
          {
            content: '$3600',
            styles:{
              halign:'right'
            }
          },
        ],
        [
          {
            content: 'Total tax:',
            styles:{
              halign:'right'
            }
          },
          {
            content: '$400',
            styles:{
              halign:'right'
            }
          },
        ],
        [
          {
            content: 'Total amount:',
            styles:{
              halign:'right'
            }
          },
          {
            content: '$4000',
            styles:{
              halign:'right'
            }
          },
        ],
      ],
      theme: 'plain'
    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Description',
            styles: {
              halign: 'left',
              fontSize: 14
            }
          }
        ],
        [
          {
            content: formData.description,
            styles: {
              halign: 'left'
            }
          }
        ],
      ],
      theme: "plain"
    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'This is a centered footer',
            styles: {
              halign: 'center'
            }
          }
        ]
      ],
      theme: "plain"
    });

    return doc.save("invoice");

  }

  constructor(private http: HttpClient,private Wservice: WsService,public env: EnvService,private tokenStorage: TokenStorageService) { }
}
