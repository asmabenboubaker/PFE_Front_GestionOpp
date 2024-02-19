import {Component, OnInit, ViewChild} from '@angular/core';
import {Opportunite} from "../../../../Models/Opportunite";
import {DxDataGridComponent, DxFormComponent} from "devextreme-angular";
import {OpportuniteService} from "../../../../Service/opportunite.service";
import {EnvService} from "../../../../../env.service";
import CustomStore from "devextreme/data/custom_store";

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
  @ViewChild('editForm', { static: false }) editForm: DxFormComponent;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  constructor(private opportuniteService: OpportuniteService, private env: EnvService) { }

  ngOnInit(): void {
    this.getAllOpportunites();
  }

  getAllOpportunites() {
    this.opportuniteService.getOpportunites().subscribe((data) => {
      this.opportunites = data;
      this.dataSourceElement = new CustomStore({
        load: (loadOptions: any) => {
          loadOptions.requireTotalCount = true;
          const size = loadOptions.take || this.env.pageSize;
          const startIndex = loadOptions.skip || 0;
          const endIndex = startIndex + size;
          const paginatedData = this.opportunites.slice(startIndex, endIndex);

          return Promise.resolve({
            data: paginatedData,
            totalCount: this.opportunites.length,
          });
        },
      });
    });
  }
}
