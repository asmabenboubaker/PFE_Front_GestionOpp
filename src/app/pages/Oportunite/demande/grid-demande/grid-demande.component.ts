import {Component, OnInit, ViewChild} from '@angular/core';
import { Client } from 'src/app/Models/Client';
import {Demande} from "../../../../Models/Demande";
import {DxDataGridComponent, DxFormComponent} from "devextreme-angular";
import {DemandeService} from "../../../../Service/demande.service";
import {EnvService} from "../../../../../env.service";
import CustomStore from "devextreme/data/custom_store";
import {Workbook} from "exceljs";
import {exportDataGrid} from "devextreme/excel_exporter";
import {jsPDF} from "jspdf";
import {exportDataGrid as exportDataGridToPdf} from "devextreme/pdf_exporter";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../../../Global/shared-service/token-storage.service";
import {CookieService} from "ngx-cookie-service";
import {ClientServiceService} from "../../../../Service/client-service.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-grid-demande',
  templateUrl: './grid-demande.component.html',
  styleUrls: ['./grid-demande.component.scss']
})
export class GridDemandeComponent implements OnInit {
  demandes: Demande[]; // Update the type to Demande
  dataSourceElement: any;
  pageSize = this.env.pageSize;
  allowedPageSizes = this.env.allowedPageSizes;
  @ViewChild('editForm', { static: false }) editForm: DxFormComponent;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  @ViewChild('dataGridDemande', {static: false}) dataGridDemande: DxDataGridComponent;
  packageName = require('package.json').name;

  constructor(private demandeService: DemandeService,private tokenStorage: TokenStorageService, private cookieService: CookieService,
              private http: HttpClient,private clientService: ClientServiceService,
              private env: EnvService,private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllDemandes();
  }

  deletedemande(id) {
    this.demandeService.deleteDemande(id).subscribe(data=>{
          this.toastr.success("  successfully deleted ")
          this.refresh();
        },
        error => {
          this.toastr.error("error")
        })
  }
  refresh(): void {
    this.dataGridDemande.instance.refresh();
  }
  popupAdd
  popupEdit
  add(e){
    this.popupAdd = e
    this.popupEdit = e
    this.refresh()
  }
  id
  Editclient(id) {
    this.id = id.data.id
    console.log(this.id)
    this.popupEdit = true

  }
    adddemande() {
        // Navigate to the add-demande component without an ID
        this.router.navigate(['Demande/add']);
    }
    Editdemande(id) {
        // Set the ID property
        this.id = id.data.id;

        // Navigate to the add-demande component with the specific ID
        this.router.navigate(['Demande/edit', this.id]);
    }
  exportGrid() {
    const doc = new jsPDF();
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: this.dataGridDemande.instance
    }).then(() => {
      doc.save('Demandes.pdf');
    })
  }

  onToolbarPreparing(e) {


    e.toolbarOptions.items.unshift(
        {
          location: 'after',
          template: 'ExportPDF'
        });
    e.toolbarOptions.items.unshift(
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Reset',
            icon: 'undo',
            onClick: this.resetGrid.bind(this),
          }
        });
    e.toolbarOptions.items.unshift(
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Refresh',
            icon: 'refresh',
            onClick: this.refresh.bind(this),
          }
        });

    e.toolbarOptions.items.unshift(
        {
          location: 'center',
          template: 'titreGrid'
        }
    );
      e.toolbarOptions.items.unshift(
          {
              location: 'after',
              widget: 'dxButton',
              options: {
                  hint: 'Add',
                  icon: 'plus',
                  onClick: this.adddemande.bind(this),
              },
          }
      );

  }
  openAddPage(e) {
    this.popupAdd = true   }
  resetGrid() {
    localStorage.removeItem(this.packageName + '_' + 'dataGridDemande');
    window.location.reload();
  }
  // getAllDemandes() {
  //   this.demandeService.getDemandes().subscribe((data) => {
  //     this.demandes = data;
  //     this.dataSourceElement = new CustomStore({
  //       load: (loadOptions: any) => {
  //         loadOptions.requireTotalCount = true;
  //         const size = loadOptions.take || this.env.pageSize;
  //         const startIndex = loadOptions.skip || 0;
  //         const endIndex = startIndex + size;
  //         const paginatedData = this.demandes.slice(startIndex, endIndex);
  //
  //         return Promise.resolve({
  //           data: paginatedData,
  //           totalCount: this.demandes.length,
  //         });
  //       },
  //     });
  //   });
  // }
  getAllDemandes() {

    this.dataSourceElement = new CustomStore({
      load: function (loadOptions: any) {

        loadOptions.requireTotalCount = true;
        var params = "";
        var paramsCount: any = '';
        if (loadOptions.take == undefined || loadOptions.take == null) {
          loadOptions.take = 0;
        }
        if (loadOptions.skip == undefined || loadOptions.skip == null) {
          loadOptions.skip = 0;
        }
        //size
        if (params === '') {
          params += 'size=' + (loadOptions.take) || this.env.pageSize;
        } else {
          params += '&size=' + (loadOptions.take) || this.env.pageSize;
        }
        //page
        params += '&page=' + (loadOptions.skip && loadOptions.skip != null && loadOptions.skip !== 0 ? (Math.ceil(loadOptions.skip / loadOptions.take)) : 0);

        //sort
        // params += '&sort=dateRecrutement,desc'
        if (loadOptions.sort) {
          if (loadOptions.sort[0].desc) {
            params += '&sort=' + loadOptions.sort[0].selector + ',desc';
          } else {
            params += '&sort=' + loadOptions.sort[0].selector + ',asc';
          }
        }
        let tab: any[] = [];
        if (loadOptions.filter) {
          if (loadOptions.filter[1] == 'and') {
            for (var i = 0; i < loadOptions.filter.length; i++) {
              if (loadOptions.filter[i][1] == 'and') {
                for (var j = 0; j < loadOptions.filter[i].length; j++) {
                  if (loadOptions.filter[i][j] != 'and') {
                    if (loadOptions.filter[i][j][1] == 'and') {
                      tab.push(loadOptions.filter[i][j][0]);
                      tab.push(loadOptions.filter[i][j][2]);
                    } else {
                      tab.push(loadOptions.filter[i][j]);
                    }
                  }
                }
              } else {
                tab.push(loadOptions.filter[i]);
              }
            }
          } else {
            tab.push([loadOptions.filter[0], loadOptions.filter[1], loadOptions.filter[2]]);
          }
        }
        let filter = {};
        let cond = {}
        let jd = 0;

        for (let i = 0; i < tab.length; i++) {
          if (tab[i][0].indexOf('.') !== -1) {
            jd++;
            let temp: any[] = tab[i][0].split('.');
            if (filter[temp[0]] !== undefined && filter[temp[0]] !== null) {
              filter[temp[0]] = filter[temp[0]] + ';' + temp[1] + ':' + tab[i][2]
              if (tab[i][1] === '=') {
                cond[temp[0]] = '.equals=';
              } else if (tab[i][1] === '<>') {
                cond[temp[0]] = '.notEquals='
              } else {
                cond[temp[0]] = '.contains='
              }
            } else {
              filter[temp[0]] = temp[1] + ':' + tab[i][2]
              if (tab[i][1] === '=') {
                cond[temp[0]] = '.equals=';
              } else if (tab[i][1] === '<>') {
                cond[temp[0]] = '.notEquals='
              } else {
                cond[temp[0]] = '.contains='
              }
            }
            delete tab[i];
          }
        }
        let filterText = ""
        Object.keys(filter).forEach(function (k) {

          filterText = filterText + '&' + k + cond[k] + filter[k];
        });
        for (let i = 0; i < tab.length; i++) {
          if (tab[i] !== undefined && tab[i] !== null) {
            if (tab[i][0] == 'startDate' || tab[i][0] == 'sysdateCreated' || tab[i][0] == 'sysdateUpdated' || tab[i][0] == 'dateTimeFrom' || tab[i][0] == 'dateTimeUntil') {
              let isoDate = new Date(tab[i][2]).toISOString();
              tab[i][2] = isoDate;
            }
            let operateur;
            switch (tab[i][1]) {
              case ('notcontains'): {
                operateur = 'doesNotContain';
                break;
              }
              case  'contains': {
                operateur = 'contains';

                break;
              }
              case '<>' : {
                if (tab[i][0] == 'arrivedDatetime') {
                  this.reqDateDebutDateFin += '&arrivedDatetime.notEquals=' + new Date(tab[i][2]).toISOString();
                }
                operateur = 'notEquals';
                break;
              }
              case  '=': {
                operateur = 'equals';
                break;
              }
              case 'endswith': {
                // q.push("(" + tab[i][0] + ":*" + tab[i][2] + ")");
                break;
              }
              case  'startswith': {
                //  q.push("(" + tab[i][0] + ":" + tab[i][2] + "*" + ")");
                break;
              }
              case  '>=': {
                if (tab[i][0] == 'arrivedDatetime') {
                  if (tab[i][0] == 'arrivedDatetime') {
                    this.reqDateDebutDateFin += '&arrivedDatetime.greaterOrEqualThan=' + new Date(tab[i][2]).toISOString();
                  }
                  this.fromDate = new Date(tab[i][2]).toISOString();
                }
                operateur = 'greaterOrEqualThan';
                break;
              }
              case  '>': {
                operateur = 'greaterOrEqualThan';
                break;
              }
              case  '<=': {
                operateur = 'lessOrEqualThan';
                break;
              }
              case  '<': {
                if (tab[i][0] == 'arrivedDatetime') {
                  this.reqDateDebutDateFin += '&arrivedDatetime.lessOrEqualThan=' + new Date(tab[i][2]).toISOString();
                  this.toDate = new Date(tab[i][2]).toISOString();
                }
                operateur = 'lessOrEqualThan';
                break;
              }
              case 'or' : {
                if (typeof (tab[i][0]) == "object") {
                  let ch = ""
                  loadOptions.filter.forEach(element => {
                    if (element[2] != null && element[2] != undefined && element[2] != "") {
                      ch += element[2] + ","
                    }
                  });
                  paramsCount += '&';
                  paramsCount += tab[i][0][0] + "." + "in=" + ch
                  paramsCount += ',';
                  params += '&';
                  params += tab[i][0][0] + "." + "in=" + ch
                } else
                  operateur = "notEquals"

                break;
              }
            }
            if (operateur !== null && operateur !== undefined && operateur != '') {
              if (tab[i][0] == 'arrivedDatetime') {
                paramsCount += '&';
                paramsCount += tab[i][0] + '.' + operateur + '=' + new Date(tab[i][2]).toISOString();
                paramsCount += ',';
                params += '&';
                params += tab[i][0] + '.' + operateur + '=' + new Date(tab[i][2]).toISOString();

              } else {
                paramsCount += '&';
                paramsCount += tab[i][0] + '.' + operateur + '=' + tab[i][2];
                paramsCount += ',';
                params += '&';

                params += tab[i][0] + '.' + operateur + '=' + tab[i][2];
              }

            }
          }
        }
        let ref = '?';

        return this.http.get(this.env.piOpp + 'demandes' + "?" + params + filterText, {headers: new HttpHeaders().set("Authorization", this.tokenStorage.getToken())})
            .toPromise()
            .then((data: any) => {
              console.log(data)
                  this.count = data.totalElements
                  this.nbPage = data['totalPages']
                  return {'data': data.content, 'totalCount': data.totalElements};

                },
                error => {
                });
      }.bind(this),

    })



  }

}
