import {Component, OnInit, ViewChild} from '@angular/core';
import {Opportunite} from "../../../../Models/Opportunite";
import {DxDataGridComponent, DxFormComponent} from "devextreme-angular";
import {OpportuniteService} from "../../../../Service/opportunite.service";
import {EnvService} from "../../../../../env.service";
import CustomStore from "devextreme/data/custom_store";
import {DemandeService} from "../../../../Service/demande.service";
import {TokenStorageService} from "../../../Global/shared-service/token-storage.service";
import {CookieService} from "ngx-cookie-service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ClientServiceService} from "../../../../Service/client-service.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {jsPDF} from "jspdf";
import {exportDataGrid as exportDataGridToPdf} from "devextreme/pdf_exporter";
import {ToastService} from "../../../../Service/toast-service";

@Component({
  selector: 'app-grid-opp',
  templateUrl: './grid-opp.component.html',
  styleUrls: ['./grid-opp.component.scss']
})
export class GridOppComponent implements OnInit {
  opportunites: Opportunite[]; // Update the type to Opportunite
  dataSourceElement: any;
  pageSize = this.env.pageSize;
  allowedPageSizes = this.env.allowedPageSizes;
  packageName = require('package.json').name;
  @ViewChild('editForm', { static: false }) editForm: DxFormComponent;
  popupDeleteVisible: boolean=false;
  @ViewChild('dataGridOpp', {static: false}) dataGridOpp: DxDataGridComponent;
  iddoc:any;
  oppadd: any;
  demandeadd: any;
  constructor(private opportuniteService: OpportuniteService,private demandeService: DemandeService,private tokenStorage: TokenStorageService, private cookieService: CookieService,
              private http: HttpClient,private clientService: ClientServiceService,
              private env: EnvService,private router: Router,private toastr: ToastrService,
              private translateService:TranslateService) { }

  ngOnInit(): void {
    this.getAllOpp();
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
          template: 'Liste Opportunités',
        }
    );
    e.toolbarOptions.items.unshift(
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: 'Add',
            icon: 'plus',
            onClick: this.addOpp.bind(this),
          },
        }
    );

  }
  resetGrid() {
    localStorage.removeItem(this.packageName + '_' + 'dataGridOpp');
    window.location.reload();
  }
  refresh(): void {
    this.dataGridOpp.instance.refresh();
  }
  addOpp() {


    this.opportuniteService.InitOpp().subscribe(data => {
      this.oppadd = data['id'];
      this.router.navigate(['opportunite/add/'+this.oppadd]);
    });

  }
  getAllOpp() {

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
        params += '&sort=id,desc'
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

        return this.http.get(this.env.piOpp + 'opportunites' + "?" + params + filterText, {headers: new HttpHeaders().set("Authorization", this.tokenStorage.getToken())})
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
id
  EditOpp(id) {
    // Set the ID property
    this.id = id.data.id;

    // Navigate to the add-demande component with the specific ID
    this.router.navigate(['opportunite/add', this.id]);
  }
  showbordereaux(id: any) {
    this.id = id.data.id;
    this.router.navigate(["opportunite/add/"+id])

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
      component: this.dataGridOpp.instance
    }).then(() => {
      doc.save('Demandes.pdf');
    })
  }
  fermerPopup() {
    this.popupDeleteVisible=false;
  }
  deleteOpp() {
    this.opportuniteService.deleteOpportuniteById(this.iddoc).subscribe(data=>{
        this.showSuccess();
      this.refresh();
      this.popupDeleteVisible = false;
    }, error => {
        this.showSuccess2();
    })

  }
  showSuccess2() {
    this.toastr.show("Impossible de supprimer cette opportunité car elle est associée à une offre!", "Opération impossible", {
      titleClass: "center",
      messageClass: "center"
    });
  }
  showSuccess() {
    this.toastr.success(
        "L'opportunité a été supprimée avec succès.",
        "Opportunié supprimée",
        {
          titleClass: "center",
          messageClass: "center"
        }
    );
  }
}
