import {Component, OnInit, ViewChild} from '@angular/core';
import { Client } from 'src/app/Models/Client';
import { ClientServiceService } from 'src/app/Service/client-service.service';
import CustomStore from "devextreme/data/custom_store";
import {EnvService} from "../../../../../env.service";

import saveAs from 'file-saver';
import { Workbook } from 'exceljs';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import {exportDataGrid} from "devextreme/excel_exporter";
import {jsPDF} from "jspdf";
import {DxDataGridComponent, DxFormComponent} from "devextreme-angular";
import {Router} from "@angular/router";



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
  @ViewChild('editForm', { static: false }) editForm: DxFormComponent;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  formData: Client = { id: 0, nom: '', adresse: '', telephone: '', email: '', dateInscription: null, typeClient: '', notes: '' ,description:''};
  isNewRecord = true;
  visible = false;
  constructor(private clientService: ClientServiceService, private env: EnvService,private router: Router) {
    
  }

  ngOnInit(): void {
    this.getAllAdministration();

  }
  exportGrid(e) {
    if (e.format === 'xlsx') {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Main sheet");
      exportDataGrid({
        worksheet: worksheet,
        component: e.component,
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "DataGrid.xlsx");
        });
      });
    }
    else if (e.format === 'pdf') {
      const doc = new jsPDF();
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('DataGrid.pdf');
      });
    }
  }

  popupAdd
  popupEdit
  add(e){
    this.popupAdd = e
    this.popupEdit = e
    this.refresh()
  }
  getAllAdministration() {
    this.clientService.getClients().subscribe((data) => {
      this.clients = data;
      this.dataSourceElement = new CustomStore({
        load: (loadOptions: any) => {
          loadOptions.requireTotalCount = true;
          const size = loadOptions.take || this.env.pageSize;
          const startIndex = loadOptions.skip || 0;
          const endIndex = startIndex + size;
          const paginatedData = this.clients.slice(startIndex, endIndex);

          return Promise.resolve({
            data: paginatedData,
            totalCount: this.clients.length,
          });
        },
      });
    });
  }
  refresh() {
    this.dataGrid.instance.refresh();
  }

  openAddPage(e) {
    this.popupAdd = true   }



  onToolbarPreparing(e) {


    // e.toolbarOptions.items.unshift(
    //     {
    //       location: 'after',
    //       template: 'ExportPDF'
    //     });

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
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        hint: 'Nouveau',
        icon: 'plus',
        onClick: this.openAddPage.bind(this),
      },
    });
    e.toolbarOptions.items.unshift(
        {
          location: 'center',
          template: 'titreGrid'
        }
    );


  }
}
