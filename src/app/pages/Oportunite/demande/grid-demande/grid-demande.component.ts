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

  constructor(private demandeService: DemandeService, private env: EnvService) { }

  ngOnInit(): void {
    this.getAllDemandes();
  }

  getAllDemandes() {
    this.demandeService.getDemandes().subscribe((data) => {
      this.demandes = data;
      this.dataSourceElement = new CustomStore({
        load: (loadOptions: any) => {
          loadOptions.requireTotalCount = true;
          const size = loadOptions.take || this.env.pageSize;
          const startIndex = loadOptions.skip || 0;
          const endIndex = startIndex + size;
          const paginatedData = this.demandes.slice(startIndex, endIndex);

          return Promise.resolve({
            data: paginatedData,
            totalCount: this.demandes.length,
          });
        },
      });
    });
  }
}
