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
    telephone: '',
    email: '',
    description: '',
    dateInscription: '',
    typeClient: '',
    notes: ''
  };

  domaineForm = this.fb.group({
    id: null,
    nom: null,
    adresse: null,
    telephone: null,
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
  ) { }
  onFieldDataChanged(e: any) {
    // Handle field data changes if needed
  }
  ngOnInit(): void {
  }

  ngAfterViewInit():void{
    
  }
  Return() {
    this.add.emit(false)
  }

  // onSubmit() {
  //   console.log("HttpServicesComponent:", this.httpServicesComponent);
  //   console.log("test   ")
  //   try {
  //
  //     // if (!this.domaineForm.value.id && !this.domaineForm.value.nom) {
  //     //   this.toastr.error('champs invalid ');
  //     // }
  //     // else{
  //       if(this.id){
  //         let paramsHttp = new HttpParam(
  //             "put",
  //             this.env.piOpp+ this.wsService.getClient+'/',
  //             this.id,
  //             this.domaineForm.value,
  //             []
  //         );
  //         this.httpServicesComponent.method(paramsHttp).then((data) => {
  //           if (data.statut === true) {
  //             this.Return();
  //           }
  //         });
  //       } else{
  //
  //         console.log("test if id null")
  //         let paramsHttp = new HttpParam(
  //             "POST",
  //             this.env.piOpp + this.wsService.getClient,
  //             '',
  //             this.domaineForm.value,
  //             []
  //         );
  //
  //           this.httpServicesComponent.method(paramsHttp).then((data) => {
  //             if (data.statut === true) {
  //               this.Return();
  //             }
  //           });
  //
  //     }
  //     //  if (this.domaineForm.valid) { // Vérifier si le formulaire est valide
  //
  //
  //     // } else if (this.domaineForm.invalid) { // Le formulaire est invalide
  //     //
  //     //   if (!this.domaineForm.value.experts["name"]) {
  //     //     this.toastr.error('Merci de séléctionner le nom expert ');
  //     //   }
  //     // }
  //   } catch (e) {
  //     // Gérer les erreurs
  //     console.log(e)
  //     this.translateService.get(this.msg).subscribe((res) => {
  //       this.toastr.error(res, "", {
  //         closeButton: true,
  //         positionClass: "toast-top-right",
  //         extendedTimeOut: this.env.extendedTimeOutToastr,
  //         progressBar: true,
  //         disableTimeOut: false,
  //         timeOut: this.env.timeOutToastr,
  //       });
  //     });
  //     return;
  //   }
  //
  // }

  onSubmit() {
    console.log("test   ");
    try {
      if (this.id) {
console.log("iddddddddddd"+this.id);
        this.domaineForm.value.id = this.id;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.tokenStorage.getToken()
        });
console.log("update:"+`${this.env.piOpp}${this.wsService.getClient}/${this.id}`);
        this.http.put(`${this.env.piOpp}${this.wsService.getClient}/${this.id}`, this.domaineForm.value, { headers})
            .subscribe((data: any) => {

              if (data.statut === true) {
                this.Return();
              }
            });
      } else {

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.tokenStorage.getToken()
        });

        this.http.post(`${this.env.piOpp}${this.wsService.getClient}`, this.domaineForm.value, { headers })
            .subscribe((data: any) => {

              console.log(this.domaineForm.value)
              if (data.statut === true) {

                this.Return();
              }
            });
      }
    } catch (e) {
      console.log(e);
      this.translateService.get(this.msg).subscribe((res) => {
        this.toastr.error(res, "", {
          closeButton: true,
          positionClass: "toast-top-right",
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
