import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/Models/Client';
import { ClientServiceService } from 'src/app/Service/client-service.service';
import CustomStore from "devextreme/data/custom_store";
import {EnvService} from "../../../../../env.service";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-grid-client',
  templateUrl: './grid-client.component.html',
  styleUrls: ['./grid-client.component.scss']
})
export class GridClientComponent implements OnInit {
  clients: Client[];
  dataSourceElement: any;
  pageSize = this.env.pageSize;
  allowedPageSizes = this.env.allowedPageSizes;

  constructor(private clientService: ClientServiceService, private env: EnvService,) {
    
  }

  ngOnInit(): void {
    this.getAllAdministration();

  }

  getAllAdministration() {
    this.clients = [
      {
        id: 1,
        adresse: '123 Main St',
        telephone: '555-1234',
        email: 'client1@example.com',
        nom: 'Client 1',
        description: 'Some description',
        dateInscription: '2024-02-14',
        typeClient: 'Regular',
        notes: 'Some notes'
      },
      {
        id: 2,
        adresse: '456 Oak St',
        telephone: '555-5678',
        email: 'client2@example.com',
        nom: 'Client 2',
        description: 'Another description',
        dateInscription: '2024-02-14',
        typeClient: 'VIP',
        notes: 'Additional notes'
      },
      {
        id: 2,
        adresse: '456 Oak St',
        telephone: '555-5678',
        email: 'client2@example.com',
        nom: 'Client 2',
        description: 'Another description',
        dateInscription: '2024-02-14',
        typeClient: 'VIP',
        notes: 'Additional notes'
      },
      {
        id: 2,
        adresse: '456 Oak St',
        telephone: '555-5678',
        email: 'client2@example.com',
        nom: 'Client 2',
        description: 'Another description',
        dateInscription: '2024-02-14',
        typeClient: 'VIP',
        notes: 'Additional notes'
      },
      {
        id: 2,
        adresse: '456 Oak St',
        telephone: '555-5678',
        email: 'client2@example.com',
        nom: 'Client 2',
        description: 'Another description',
        dateInscription: '2024-02-14',
        typeClient: 'VIP',
        notes: 'Additional notes'
      },
      {
        id: 2,
        adresse: '456 Oak St',
        telephone: '555-5678',
        email: 'client2@example.com',
        nom: 'Client 2',
        description: 'Another description',
        dateInscription: '2024-02-14',
        typeClient: 'VIP',
        notes: 'Additional notes'
      },
      {
        id: 2,
        adresse: '456 Oak St',
        telephone: '555-5678',
        email: 'client2@example.com',
        nom: 'Client 2',
        description: 'Another description',
        dateInscription: '2024-02-14',
        typeClient: 'VIP',
        notes: 'Additional notes'
      },
      {
        id: 2,
        adresse: '456 Oak St',
        telephone: '555-5678',
        email: 'client2@example.com',
        nom: 'Client 2',
        description: 'Another description',
        dateInscription: '2024-02-14',
        typeClient: 'VIP',
        notes: 'Additional notes'
      },
      {
        id: 2,
        adresse: '456 Oak St',
        telephone: '555-5678',
        email: 'client2@example.com',
        nom: 'Client 2',
        description: 'Another description',
        dateInscription: '2024-02-14',
        typeClient: 'VIP',
        notes: 'Additional notes'
      },
      {
        id: 2,
        adresse: '456 Oak St',
        telephone: '555-5678',
        email: 'client2@example.com',
        nom: 'Client 2',
        description: 'Another description',
        dateInscription: '2024-02-14',
        typeClient: 'VIP',
        notes: 'Additional notes'
      },
      {
        id: 2,
        adresse: '456 Oak St',
        telephone: '555-5678',
        email: 'client2@example.com',
        nom: 'Client 2',
        description: 'Another description',
        dateInscription: '2024-02-14',
        typeClient: 'VIP',
        notes: 'Additional notes'
      },
      {
        id: 2,
        adresse: '456 Oak St',
        telephone: '555-5678',
        email: 'client2@example.com',
        nom: 'Client 2',
        description: 'Another description',
        dateInscription: '2024-02-14',
        typeClient: 'VIP',
        notes: 'Additional notes'
      },
      {
        id: 2,
        adresse: '456 Oak St',
        telephone: '555-5678',
        email: 'client2@example.com',
        nom: 'Client 2',
        description: 'Another description',
        dateInscription: '2024-02-14',
        typeClient: 'VIP',
        notes: 'Additional notes'
      },
      {
        id: 2,
        adresse: '456 Oak St',
        telephone: '555-5678',
        email: 'client2@example.com',
        nom: 'Client 2',
        description: 'Another description',
        dateInscription: '2024-02-14',
        typeClient: 'VIP',
        notes: 'Additional notes'
      },
      {
        id: 2,
        adresse: '456 Oak St',
        telephone: '555-5678',
        email: 'client2@example.com',
        nom: 'Client 2',
        description: 'Another description',
        dateInscription: '2024-02-14',
        typeClient: 'VIP',
        notes: 'Additional notes'
      },
      {
        id: 2,
        adresse: '456 Oak St',
        telephone: '555-5678',
        email: 'client2@example.com',
        nom: 'Client 2',
        description: 'Another description',
        dateInscription: '2024-02-14',
        typeClient: 'VIP',
        notes: 'Additional notes'
      },
      {
        id: 2,
        adresse: '456 Oak St',
        telephone: '555-5678',
        email: 'client2@example.com',
        nom: 'Client 2',
        description: 'Another description',
        dateInscription: '2024-02-14',
        typeClient: 'VIP',
        notes: 'Additional notes'
      },
      {
        id: 2,
        adresse: '456 Oak St',
        telephone: '555-5678',
        email: 'client2@example.com',
        nom: 'Client 2',
        description: 'Another description',
        dateInscription: '2024-02-14',
        typeClient: 'VIP',
        notes: 'Additional notes'
      }
    ];
console.log("testtttttttttttttt");

    this.dataSourceElement = new CustomStore({
      load: (loadOptions: any) => {

        loadOptions.requireTotalCount = true;

        // Use the 'size' part of the code
        const size = loadOptions.take || this.env.pageSize;

        // Simulate paginated data based on 'size' and 'skip' properties
        const startIndex = loadOptions.skip || 0;
        const endIndex = startIndex + size;
        const paginatedData = this.clients.slice(startIndex, endIndex);

        return Promise.resolve({
          data: paginatedData,
          totalCount: this.clients.length
        });
      },
    });
  }

  // getAllAdministration() {
  //   this.dataSourceElement = new CustomStore({
  //     load: function (loadOptions: any) {
  //
  //
  //       if (this.router.url.indexOf('chambres') != -1) {
  //         var params = "elementCategorie.equals=CHAMBRE";
  //       } else {
  //         var params = "elementCategorie.equals=SECTION";
  //       }
  //       loadOptions.requireTotalCount = true;
  //       var paramsCount: any = '';
  //       if (loadOptions.take == undefined || loadOptions.take == null) {
  //         loadOptions.take = 0;
  //       }
  //       if (loadOptions.skip == undefined || loadOptions.skip == null) {
  //         loadOptions.skip = 0;
  //       }
  //       //size
  //       if (params === '') {
  //         params += 'size=' + (loadOptions.take) || this.env.pageSize;
  //       } else {
  //         params += '&size=' + (loadOptions.take) || this.env.pageSize;
  //       }
  //       //page
  //       params += '&page=' + (loadOptions.skip && loadOptions.skip != null && loadOptions.skip !== 0 ? (Math.ceil(loadOptions.skip / loadOptions.take)) : 0);
  //
  //       //sort
  //       // params += '&sort=dateRecrutement,desc'
  //       if (loadOptions.sort) {
  //         if (loadOptions.sort[0].desc) {
  //           params += '&sort=' + loadOptions.sort[0].selector + ',desc';
  //         } else {
  //           params += '&sort=' + loadOptions.sort[0].selector + ',asc';
  //         }
  //       }
  //       let tab: any[] = [];
  //       if (loadOptions.filter) {
  //         if (loadOptions.filter[1] == 'and') {
  //           for (var i = 0; i < loadOptions.filter.length; i++) {
  //             if (loadOptions.filter[i][1] == 'and') {
  //               for (var j = 0; j < loadOptions.filter[i].length; j++) {
  //                 if (loadOptions.filter[i][j] != 'and') {
  //                   if (loadOptions.filter[i][j][1] == 'and') {
  //                     tab.push(loadOptions.filter[i][j][0]);
  //                     tab.push(loadOptions.filter[i][j][2]);
  //                   } else {
  //                     tab.push(loadOptions.filter[i][j]);
  //                   }
  //                 }
  //               }
  //             } else {
  //               tab.push(loadOptions.filter[i]);
  //             }
  //           }
  //         } else {
  //           tab.push([loadOptions.filter[0], loadOptions.filter[1], loadOptions.filter[2]]);
  //         }
  //       }
  //       let filter = {};
  //       let cond = {}
  //       let jd = 0;
  //
  //       for (let i = 0; i < tab.length; i++) {
  //         if (tab[i][0].indexOf('.') !== -1) {
  //           jd++;
  //           let temp: any[] = tab[i][0].split('.');
  //           if (filter[temp[0]] !== undefined && filter[temp[0]] !== null) {
  //             filter[temp[0]] = filter[temp[0]] + ';' + temp[1] + ':' + tab[i][2]
  //             if (tab[i][1] === '=') {
  //               cond[temp[0]] = '.equals=';
  //             } else if (tab[i][1] === '<>') {
  //               cond[temp[0]] = '.notEquals='
  //             } else {
  //               cond[temp[0]] = '.contains='
  //             }
  //           } else {
  //             filter[temp[0]] = temp[1] + ':' + tab[i][2]
  //             if (tab[i][1] === '=') {
  //               cond[temp[0]] = '.equals=';
  //             } else if (tab[i][1] === '<>') {
  //               cond[temp[0]] = '.notEquals='
  //             } else {
  //               cond[temp[0]] = '.contains='
  //             }
  //           }
  //           delete tab[i];
  //         }
  //       }
  //       let filterText = ""
  //       Object.keys(filter).forEach(function (k) {
  //
  //         filterText = filterText + '&' + k + cond[k] + filter[k];
  //       });
  //       for (let i = 0; i < tab.length; i++) {
  //         if (tab[i] !== undefined && tab[i] !== null) {
  //           if (tab[i][0] == 'startDate' || tab[i][0] == 'sysdateCreated' || tab[i][0] == 'sysdateUpdated' || tab[i][0] == 'dateTimeFrom' || tab[i][0] == 'dateTimeUntil') {
  //             let isoDate = new Date(tab[i][2]).toISOString();
  //             tab[i][2] = isoDate;
  //           }
  //           let operateur;
  //           switch (tab[i][1]) {
  //             case ('notcontains'): {
  //               operateur = 'doesNotContain';
  //               break;
  //             }
  //             case  'contains': {
  //               operateur = 'contains';
  //
  //               break;
  //             }
  //             case '<>' : {
  //               if (tab[i][0] == 'arrivedDatetime') {
  //                 this.reqDateDebutDateFin += '&arrivedDatetime.notEquals=' + new Date(tab[i][2]).toISOString();
  //               }
  //               operateur = 'notEquals';
  //               break;
  //             }
  //             case  '=': {
  //               operateur = 'equals';
  //               break;
  //             }
  //             case 'endswith': {
  //               // q.push("(" + tab[i][0] + ":*" + tab[i][2] + ")");
  //               break;
  //             }
  //             case  'startswith': {
  //               //  q.push("(" + tab[i][0] + ":" + tab[i][2] + "*" + ")");
  //               break;
  //             }
  //             case  '>=': {
  //               if (tab[i][0] == 'arrivedDatetime') {
  //                 if (tab[i][0] == 'arrivedDatetime') {
  //                   this.reqDateDebutDateFin += '&arrivedDatetime.greaterOrEqualThan=' + new Date(tab[i][2]).toISOString();
  //                 }
  //                 this.fromDate = new Date(tab[i][2]).toISOString();
  //               }
  //               operateur = 'greaterOrEqualThan';
  //               break;
  //             }
  //             case  '>': {
  //               operateur = 'greaterOrEqualThan';
  //               break;
  //             }
  //             case  '<=': {
  //               operateur = 'lessOrEqualThan';
  //               break;
  //             }
  //             case  '<': {
  //               if (tab[i][0] == 'arrivedDatetime') {
  //                 this.reqDateDebutDateFin += '&arrivedDatetime.lessOrEqualThan=' + new Date(tab[i][2]).toISOString();
  //                 this.toDate = new Date(tab[i][2]).toISOString();
  //               }
  //               operateur = 'lessOrEqualThan';
  //               break;
  //             }
  //             case 'or' : {
  //               if (typeof (tab[i][0]) == "object") {
  //                 let ch = ""
  //                 loadOptions.filter.forEach(element => {
  //                   if (element[2] != null && element[2] != undefined && element[2] != "") {
  //                     ch += element[2] + ","
  //                   }
  //                 });
  //                 paramsCount += '&';
  //                 paramsCount += tab[i][0][0] + "." + "in=" + ch
  //                 paramsCount += ',';
  //                 params += '&';
  //                 params += tab[i][0][0] + "." + "in=" + ch
  //               } else
  //                 operateur = "notEquals"
  //
  //               break;
  //             }
  //           }
  //           if (operateur !== null && operateur !== undefined && operateur != '') {
  //             if (tab[i][0] == 'arrivedDatetime') {
  //               paramsCount += '&';
  //               paramsCount += tab[i][0] + '.' + operateur + '=' + new Date(tab[i][2]).toISOString();
  //               paramsCount += ',';
  //               params += '&';
  //               params += tab[i][0] + '.' + operateur + '=' + new Date(tab[i][2]).toISOString();
  //
  //             } else {
  //               paramsCount += '&';
  //               paramsCount += tab[i][0] + '.' + operateur + '=' + tab[i][2];
  //               paramsCount += ',';
  //               params += '&';
  //
  //               params += tab[i][0] + '.' + operateur + '=' + tab[i][2];
  //             }
  //
  //           }
  //         }
  //       }
  //       let ref = '?';
  //       let url
  //       if (this.router.url.indexOf('chambres') != -1) {
  //         url = this.wsService.getelementsByChambre
  //       } else {
  //         url = this.wsService.getAllElement
  //       }
  //       return this.http.get(this.env.apiUrlMetiers + url + "?" + params + filterText, {headers: new HttpHeaders().set("Authorization", this.tokenStorage.getToken())})
  //           .toPromise()
  //           .then((data: any) => {
  //                 this.count = data.totalElements
  //                 this.nbPage = data['totalPages']
  //                 return {'data': data.content, 'totalCount': data.totalElements};
  //               },
  //               error => {
  //               });
  //     }.bind(this),
  //
  //   })
  // }

}
