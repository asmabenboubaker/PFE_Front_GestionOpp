import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
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
export class AddClientComponent implements OnInit,OnChanges  {
  @Output() add = new EventEmitter<boolean>();
  @Input() id: string;

  private msg: string = 'defaultErrorMessageKey';
  dataSourcePays
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
    nom: ['', Validators.required],
    adresse: ['', Validators.required],
    telephne: ['', Validators.required],
    email: ['', Validators.required],
    description: null,
    dateInscription:null,
    typeClient: null,
    notes: null
  })
  // domaineForm = this.fb.group({
  //   id: [null],
  //   nom: [null, Validators.required],
  //   adresse: [null, Validators.required],
  //   telephne: [null],
  //   email: [null, [Validators.required, Validators.email]],
  //   description: [null],
  //   dateInscription: [null, Validators.required],
  //   typeClient: [null, Validators.required],
  //   notes: [null],
  // });

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


  }



    Return() {

        // this.router.navigate(["/client/all"]);

        this.add.emit(false)

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changinID(changes.id.currentValue);
  }
  changinID(id){
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

  onSubmit() {
    console.log('test');
    try {
      const clientData: Client = this.domaineForm.value as Client;
      if (this.id ) {
        console.log('iddddddddddd' + this.id);

        this.domaineForm.value.id = this.id;

        this.clientService.updateClient(clientData, this.id)
            .subscribe((data: any) => {

              this.Return();
            }, error => {
              // Handle error
            });
      } else {
        if(this.domaineForm.valid) {
          this.clientService.addClient(clientData)
              .subscribe((data: any) => {

                this.Return();
              }, error => {
                // Handle error
              });

        }else {
            if (!this.domaineForm.value.nom) {
              this.toastr.error('Merci de saisir le nom ');
            }
          if (!this.domaineForm.value.adresse) {
            this.toastr.error('Merci de saisir l adresse ');
          }
          if (!this.domaineForm.value.telephne) {
            this.toastr.error('Merci de saisir le numéro de téléphone ');
          }
          if (!this.domaineForm.value.email) {
            this.toastr.error('Merci de saisir l email ');
          }
        }
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
