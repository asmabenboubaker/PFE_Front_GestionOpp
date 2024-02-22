import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Client } from 'src/app/Models/Client';
import { ClientServiceService } from 'src/app/Service/client-service.service';
import {FormBuilder,FormGroup,Validators } from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {HttpParam} from "../../../Global/ps-tools/class";
import {EnvService} from "../../../../../env.service";
import {WsService} from "../../../../../ws.service";
import {HttpServicesComponent} from "../../../Global/ps-tools/http-services/http-services.component";
import {TranslateService} from "@ngx-translate/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {TokenStorageService} from "../../../Global/shared-service/token-storage.service";
import {Router} from "@angular/router";
import {Components} from "formiojs";
import number = Components.components.number;

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  @Output() add = new EventEmitter<boolean>();
  @Input() id: string;

  private msg: string = 'defaultErrorMessageKey';

  newClient: Client = {
    id: 0,
    nom: '',
    adresse: '',
    telephne: '',
    email: '',
    description: '',
    dateInscription: null,
    typeClient: '',
    notes: ''
  };

  domaineForm = this.fb.group({
    id: null,
    nom: null,
    adresse: null,
    telephne: null,
    email: null,
    description: null,
    dateInscription:null,
    typeClient: null,
    notes: null
  })


  constructor(private clientService: ClientServiceService,private fb: FormBuilder,
              private toastr: ToastrService, private env: EnvService,   private wsService: WsService,
              private translateService: TranslateService,
              private tokenStorage: TokenStorageService,
              private http: HttpClient,
              private router: Router
  ) { }
  onFieldDataChanged(e: any) {
    // Handle field data changes if needed
  }
  ngOnInit(): void {
    if (this.id) {
      const clientId = +this.id;
      this.clientService.getClientById(clientId).subscribe(
          (client: Client) => {

            this.domaineForm.patchValue(client);
          },
          (error) => {
            console.error('Error fetching client details:', error);
          }
      );
    }

  }



    Return() {

        // this.router.navigate(["/client/all"]);

        this.add.emit(false)

  }



  onSubmit() {
    console.log('test');
    try {
      const clientData: Client = this.domaineForm.value as Client;
      if (this.id) {
        console.log('iddddddddddd' + this.id);

        this.domaineForm.value.id = this.id;

        this.clientService.updateClient(clientData, this.id)
            .subscribe((data: any) => {

              this.Return();
            }, error => {
              // Handle error
            });
      } else {
        this.clientService.addClient(clientData)
            .subscribe((data: any) => {

              this.Return();
            }, error => {
              // Handle error
            });
      }
    } catch (e) {
      console.log(e);
      this.translateService.get(this.msg).subscribe((res) => {
        this.toastr.error(res, '', {
          closeButton: true,
          positionClass: 'toast-top-right',
          extendedTimeOut: this.env.extendedTimeOutToastr,
          progressBar: true,
          disableTimeOut: false,
          timeOut: this.env.timeOutToastr,
        });
      });
      return;
    }
  }

}
