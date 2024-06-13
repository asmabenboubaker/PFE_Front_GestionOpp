import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Client} from "../../../../Models/Client";
import {DxDataGridComponent} from "devextreme-angular";
import DataSource from "devextreme/data/data_source";
import {EtudetechServiceService} from "../../../../Service/etudetech-service.service";
import CustomStore from "devextreme/data/custom_store";
import {HttpHeaders} from "@angular/common/http";
declare var webkitSpeechRecognition;
@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.scss']
})
export class AddDetailsComponent implements OnInit{
  results;
  constructor(service: EtudetechServiceService) {

  }

  startListening() {
    // let voiceHandler = this.hiddenSearchHandler?.nativeElement;
    if ('webkitSpeechRecognition' in window) {
      const vSearch = new webkitSpeechRecognition();
      vSearch.continuous = false;
      vSearch.interimresults = false;
      vSearch.lang = 'fr-FR';
      // vSearch.lang = 'en-US';
      vSearch.start();
      vSearch.onresult = (e) => {
        console.log(e);
        // voiceHandler.value = e?.results[0][0]?.transcript;
        this.results = e.results[0][0].transcript;
        this.getResult();
        // console.log(this.results);
        vSearch.stop();
      };
    } else {
      alert('Your browser does not support voice recognition!');
    }
  }

  getResult() {
    console.log(this.results);
  }
  ngOnInit(): void {
  }

}
