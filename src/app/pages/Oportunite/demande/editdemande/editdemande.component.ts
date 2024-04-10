import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DemandeService} from "../../../../Service/demande.service";
import {ToastrService} from "ngx-toastr";
import {EnvService} from "../../../../../env.service";
import {WsService} from "../../../../../ws.service";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Demande} from "../../../../Models/Demande";
import {Client} from "../../../../Models/Client";
import {ClientServiceService} from "../../../../Service/client-service.service";

@Component({
  selector: 'app-editdemande',
  templateUrl: './editdemande.component.html',
  styleUrls: ['./editdemande.component.scss']
})
export class EditdemandeComponent implements OnInit {
    demandeForm: any;
    statusList: string[] = [];
    userPermission:any;
    decissionWF:any;

  id
    clients: Client[] = [];
    @ViewChild('clientSelect') clientSelect: ElementRef;

    PopupConfirmationCreation: boolean = false
  constructor(private fb: FormBuilder,private demandeService: DemandeService,private clientService:ClientServiceService,
              private toastr: ToastrService, private env: EnvService,   private wsService: WsService,
              private translateService: TranslateService, private router: Router, private route: ActivatedRoute
             ) {

      // this.secondFormGroup = new FormGroup({
      //     depositoryName: new FormControl(null, Validators.required),
      //     secondStep: new FormControl(null, Validators.required)
      //
      // });
      this.demandeForm = this.fb.group({
          id: null, // You might want to initialize other properties based on your requirements
          nom: ['', Validators.required],
          description: null,

          statutDemande: null,
          statut: [null, Validators.required],

      });
  }

  ngOnInit(): void {
      this.loadClients();
      this.fetch_RequestCase_Data(this.route.snapshot.params['id']);
    this.demandeService.getStatusList().subscribe((statuses) => {
      this.statusList = statuses;
    });
// remplir les champs


//       this.demandeService.getDemandeByid(this.route.snapshot.params['id']).subscribe((result) => {
//               console.log(result)
//
//               this.demandeForm.get('id').setValue(result['id']);
//               this.demandeForm.get('nom').setValue(result['nom']);
//               this.demandeForm.get('description').setValue(result['description']);
//               this.demandeForm.get('statut').setValue(result['statut']);
//               const dateDeCreation = result['dateDeCreation'] ? new Date(result['dateDeCreation']) : null;
//               this.demandeForm.get('dateDeCreation').setValue(this.formatDate(dateDeCreation));
// // this.demandeForm.get('client').setValue(result['client']);
//
//               const clientId = result['client'] ? result['client']['id'] : (this.clients.length > 0 ? this.clients[0].id : null);
//               // this.demandeForm.get('client').setValue(clientId);
//
//               // get userPermission
//               this.demandeForm.get('userPermission').setValue(result['userPermission']);
//               this.userPermission = result['userPermission'];
//               console.log("result['userPermission']"+this.userPermission )
//               //get workflow
//                 this.demandeForm.get('workflow').setValue(result['workflow']);
//                 //get decissionWF
//                 //this.demandeForm.get('decissionWF').setValue(result['decissionWF']);
//                 //get decissionWF
//           this.decissionWF = result['workflow']['decisionsWF'];
//
//               console.log("this.decissionWF"+this.decissionWF )
//
//           }
//       );

  }


    formatDate(date: Date): string {
    if (date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return null;
  }

  Return() {
    this.router.navigate(['Demande/user']);
  }

    // getClientName(): string {
    //     const clientControl = this.demande_Data.get('client');
    //     if (clientControl && clientControl.value && clientControl.value.nom) {
    //         return clientControl.value.nom;
    //     } else {
    //         return 'xwxwx'; // or any default value you want to display
    //     }
    // }

    loadClients() {
        this.clientService.getAllClientsWithoutPages().subscribe(
            (clients: Client[]) => {
                this.clients = clients;
            },
            (error) => {
                console.error('Error fetching clients: ', error);
            }
        );
    }

    fetch_RequestCase_Data(id) {
        this.demandeService.getDemandeByid(id).toPromise().then(
            data => {
                // remplir formulaire pas data
                console.log("data", data)
                this.demandeForm.get('id').setValue(data.id);
                this.demandeForm.get('nom').setValue(data.nom);
                this.demandeForm.get('description').setValue(data.description);
                this.demandeForm.get('statut').setValue(data.statut);
                // const dateDeCreation = data.dateDeCreation ? new Date(data.dateDeCreation) : null;
                // this.demandeForm.get('dateDeCreation').setValue(this.formatDate(dateDeCreation));
                console.log("Fetched Successfully :", data);
                // Vérifiez si data.workflow est défini avant d'accéder à decisionsWF
                this.decissionWF = data.workflow && data.workflow.decisionsWF ? data.workflow.decisionsWF : null;
                const clientId = data['client'] ? data['client']['id'] : (this.clients.length > 0 ? this.clients[0].id : null);
                //set select client
                this.clientSelect.nativeElement.value = clientId;


                //const decisionsWF = data.workflow.decisionsWF
                console.log("DECICIONS WK ::: "+ this.decissionWF);
                // Créez un nouvel objet FormGroup en utilisant FormBuilder et initialisez-le avec les données récupérées
                // this.demandeForm = this.fb.group({
                //     id: [data.id],
                //     nom: [data.nom, Validators.required],
                //     description: [data.description],
                //     dateDeCreation: [data.dateDeCreation],
                //     statutDemande: [data.statutDemande],
                //     statut: [data.statut],
                //     userPermission: [data.userPermission],
                //     activityName: [data.activityName],
                //
                // });
                // this.demandeForm.get('workflow').setValue(data['workflow']);
                // //get decissionWF
                // this.demandeForm.get('decissionWF').setValue(data['decissionWF']);
                //get decissionWF
                this.decissionWF = data['workflow']['decisionsWF'];
                // this.demandeForm.get('workflow').setValue(data.workflow);
                console.log("fetchdemande"+this.demandeForm.value);
                console.log(" data.workflow.decisionsW"+this.demandeForm.workflow.value);
                console.log("  this.demandeForm.get('workflow')"+  this.demandeForm.get('workflow').value);
            },
            error => {
                console.log("Error :", error);
            }
        );
    }


    OuvrirPopupConfirmation() {
        this.PopupConfirmationCreation = true
    }

    onSubmit() {
        this.demandeForm.value.id = this.route.snapshot.params['id'];
        const demandeData: Demande = this.demandeForm.value as Demande;
   // affecter id to demandeData
        demandeData.id = this.route.snapshot.params['id'];
        const selectedClientId = this.clientSelect?.nativeElement.value;
        console.log('Client Select Element:', this.clientSelect);
        console.log('Client Select Value:', this.clientSelect?.nativeElement.value);
        console.log("here is your data to update:", demandeData);
        this.demandeService.updateAndAssignToClient(selectedClientId,this.route.snapshot.params['id'], demandeData)
            .subscribe((data: any) => {

                this.Return();

            }, error => {
                console.log("Handle error");
            });
    }
    // saveObjet() {
    //
    //     this.demandeForm.value.id = this.route.snapshot.params['id'];
    //     const demandeData: Demande = this.demandeForm.value as Demande;
    //
    //     const selectedClientId = this.clientSelect?.nativeElement.value;
    //     console.log('Client Select Element:', this.clientSelect);
    //     console.log('Client Select Value:', this.clientSelect?.nativeElement.value);
    //
    //     console.log("here is your data to update:", demandeData);
    //
    //     this.demandeService.updateAndAssignToClient(
    //         selectedClientId,
    //         this.route.snapshot.params['id'],
    //         demandeData
    // ).subscribe((data: any) => {
    //         this.translateService.get("Global.messageUpdateSucces").subscribe((res) => {
    //             this.toastr.success(res, "", {
    //                 closeButton: true,
    //                 positionClass: 'toast-top-right',
    //                 extendedTimeOut: this.env.extendedTimeOutToastr,
    //                 progressBar: true,
    //                 disableTimeOut: false,
    //                 timeOut: this.env.timeOutToastr
    //             })
    //         })
    //     }, error => {
    //         this.translateService.get("Global.messageCreateError").subscribe((res) => {
    //             this.toastr.error(res, "", {
    //                 closeButton: true,
    //                 positionClass: 'toast-top-right',
    //                 extendedTimeOut: this.env.extendedTimeOutToastr,
    //                 progressBar: true,
    //                 disableTimeOut: false,
    //                 timeOut: this.env.timeOutToastr
    //             })
    //         })
    //     })
    //     // this.myForm.get('decision').setValue('تقديم المطلب')
    //     // this.myForm.get('depositoryName').setValue(this.secondFormGroup.get('depositoryName').value)
    //     // this.myForm.get('entityDetails').setValue(this.dataSourceparties)
    //     // this.myForm.get('lawyerDetails').setValue(this.dataSourceAvocats)
    //     //
    //     // let attachedFiles = this.attachedFiles.filter(file => file !== null);
    //     //
    //     //
    //     // this.myForm.get('attachements').setValue(attachedFiles)
    //     //
    //     // this.caseRequestService.submitRequestCase(this.myForm.value).subscribe((data: any) => {
    //     //     console.log("data update")
    //     //
    //     // })
    //
    //
    // }
    Ouvrir(){

    }
    Retourn() {
        //this.location.back();
    }


}
