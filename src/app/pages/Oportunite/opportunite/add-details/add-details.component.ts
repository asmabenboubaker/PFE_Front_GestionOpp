import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Client} from "../../../../Models/Client";
import {DxDataGridComponent} from "devextreme-angular";
import DataSource from "devextreme/data/data_source";
import {EtudetechServiceService} from "../../../../Service/etudetech-service.service";
import CustomStore from "devextreme/data/custom_store";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.scss']
})
export class AddDetailsComponent implements OnInit{
 
  constructor(service: EtudetechServiceService) {

  }


  ngOnInit(): void {
  }

}
