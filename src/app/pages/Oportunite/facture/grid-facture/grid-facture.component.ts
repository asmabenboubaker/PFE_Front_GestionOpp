import {Component, OnInit, ViewChild} from '@angular/core';
import {FactureService} from "../../../../Service/facture.service";
import {FormBuilder} from "@angular/forms";
import {DemandeService} from "../../../../Service/demande.service";
import {ClientServiceService} from "../../../../Service/client-service.service";
import {ToastrService} from "ngx-toastr";
import {EnvService} from "../../../../../env.service";
import {WsService} from "../../../../../ws.service";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, Router} from "@angular/router";
import {jsPDF} from "jspdf";
import {exportDataGrid as exportDataGridToPdf} from "devextreme/pdf_exporter";
import {DxDataGridComponent} from "devextreme-angular";
import {TokenStorageService} from "../../../Global/shared-service/token-storage.service";
import {CookieService} from "ngx-cookie-service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import CustomStore from "devextreme/data/custom_store";

@Component({
  selector: 'app-grid-facture',
  templateUrl: './grid-facture.component.html',
  styleUrls: ['./grid-facture.component.scss']
})
export class GridFactureComponent implements OnInit {
    popupDeleteVisible: boolean=false;
    iddoc:any;
    @ViewChild('dataGridFacture', {static: false}) dataGridFacture: DxDataGridComponent;
    dataSourceElement: any;
    pageSize = this.env.pageSize;
    allowedPageSizes = this.env.allowedPageSizes;
    packageName = require('package.json').name;
  constructor(private demandeService: DemandeService,private tokenStorage: TokenStorageService, private cookieService: CookieService,
              private http: HttpClient,private clientService: ClientServiceService,
              private env: EnvService,private router: Router,private toastr: ToastrService,
              private translateService:TranslateService,
              private factureService :FactureService
              ) { }

  ngOnInit(): void {
    this.getAllFactures();
  }
    showbordereaux(id: any) {
        this.router.navigate(["Facture/edit/"+id])

    }
    popupDelete(id:any) {
        this.popupDeleteVisible=true;
        console.log("DELETE"+this.popupDeleteVisible.toString());
        this.iddoc=id;

    }
    exportGrid() {
        const doc = new jsPDF();
        exportDataGridToPdf({
            jsPDFDocument: doc,
            component: this.dataGridFacture.instance
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

    resetGrid() {
        localStorage.removeItem(this.packageName + '_' + 'dataGridDemande');
        window.location.reload();
    }
    refresh(): void {
        this.dataGridFacture.instance.refresh();
    }
    adddemande() {
        // Navigate to the add-demande component without an ID
        this.router.navigate(['Facture/add']);
    }

    fermerPopup() {
        this.popupDeleteVisible=false;
    }

    deletedemande() {
        this.factureService.deleteFacture(this.iddoc).subscribe(data=>{

            this.translateService.get("deleteWithSuccess").subscribe(
                res => {
                    this.toastr.success(res, "", {
                        closeButton: true,
                        positionClass: 'toast-top-right',
                        extendedTimeOut: this.env.extendedTimeOutToastr,
                        progressBar: true,
                        disableTimeOut: false,
                        timeOut: this.env.timeOutToastr
                    })
                }
            )
            this.popupDeleteVisible = false;
            this.refresh();
        }, error => {
            this.toastr.error(error.error.message, "", {
                closeButton: true,
                positionClass: 'toast-top-right',
                extendedTimeOut: this.env.extendedTimeOutToastr,
                progressBar: true,
                disableTimeOut: false,
                timeOut: this.env.timeOutToastr
            })
        })

    }

  getAllFactures() {

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

        return this.http.get(this.env.piOpp + 'factures' + "?" + params + filterText, {headers: new HttpHeaders().set("Authorization", this.tokenStorage.getToken())})
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
