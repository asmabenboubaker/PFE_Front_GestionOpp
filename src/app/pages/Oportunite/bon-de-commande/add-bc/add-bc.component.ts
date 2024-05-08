import { Component, OnInit } from '@angular/core';
import { Tab, initMDB } from "mdb-ui-kit";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BcServiceService} from "../../../../Service/bc-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {EnvService} from "../../../../../env.service";

@Component({
  selector: 'app-add-bc',
  templateUrl: './add-bc.component.html',
  styleUrls: ['./add-bc.component.scss']
})
export class AddBcComponent implements OnInit {
  statusList: string[] = [];
  demandeid
  objectData:any
  decissionWF:any
    demandeForm: any;
    verification=false;
    traitement=false;
    validation=false;
    elsedesision=false;
  demandeF= new FormGroup({
    id: new FormControl(''),

    description: new FormControl(''),
    dateCommande: new FormControl(''),
    montantTotal: new FormControl(''),
      servicecommande: new FormControl(''),
      methodedepaiement: new FormControl(''),
      datedelivraison: new FormControl(''),

  });
  constructor(private servicebc:BcServiceService, private router: Router,
              public route: ActivatedRoute,private fb: FormBuilder,
    private toastr: ToastrService, private env: EnvService,
) {

      this.demandeForm = this.fb.group({
            id: [''],
            description: [''],
            dateCommande: [''],
            montantTotal: [''],
          servicecommande: [''],
          methodedepaiement: [''],
          datedelivraison: [''],

        });
      }



  ngOnInit(): void {
    initMDB({ Tab });
    this.servicebc.getStatusList().subscribe((statuses) => {
      this.statusList = statuses;
    });

    this.demandeid=this.route.snapshot.paramMap.get('id');
    this.servicebc.getbcById(this.demandeid).toPromise().then(
        data => {
          this.objectData=data

          // this.demandeF.get('deadline').setValue(data.deadline);
          // const clientId = data['client'] ? data['client']['id'] : (this.clients.length > 0 ? this.clients[0].id : null);
          // this.demandeF.get('client').setValue(clientId);
          console.log("Fetched Successfully :", data);
          // Vérifiez si data.workflow est défini avant d'accéder à decisionsWF
          this.decissionWF = data.workflow && data.workflow.decisionsWF ? data.workflow.decisionsWF : null;

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

          //get decissionWF
          this.decissionWF = data['workflow']['decisionsWF'];
          //check decision
          if(this.decissionWF=="Verification"){
            this.verification=true;
            console.log("pourvalidation",this.verification)
          }else if (this.decissionWF[0]=="Rejeter" || this.decissionWF[1]=="Accepter"){
            this.traitement=true;
              console.log("traitement",this.traitement)
          }
          else if (this.decissionWF[0]=="Valider" || this.decissionWF[1]=="Rejeter"){
            this.validation=true;
          }
          else {
            this.elsedesision=true;
          }
        },
        error => {
          console.log("Error :", error);
        }
    );

    console.log("this.demandeF",this.objectData)
  }

    Confirmation(evt) {

        const formData = this.demandeF.value;


        // this.demandeDTO['decision'] = evt.decision
        // this.demandeDTO['wfCurrentComment ']= evt.wfCurrentComment
        formData['decision'] = evt.decision;
        formData['wfCurrentComment'] = evt.wfCurrentComment;
        console.log("this.demanade CONFIRMATION",formData)
//set id
        formData['id'] = this.demandeid;
        this.servicebc.BC_process_Submit(formData).subscribe(data => {

            this.toastr.success(" added successfully" +
                "", "", {
                closeButton: true,
                positionClass: 'toast-top-right',
                extendedTimeOut: this.env.extendedTimeOutToastr,
                progressBar: true,
                disableTimeOut: false,
                timeOut: this.env.timeOutToastr
            })
            //redirect to demande add id
            this.router.navigate(['Demande/add/']+this.demandeid);
        }, error => {
            this.toastr.error("failed to add ", "", {
                closeButton: true,
                positionClass: 'toast-top-right',
                extendedTimeOut: this.env.extendedTimeOutToastr,
                progressBar: true,
                disableTimeOut: false,
                timeOut: this.env.timeOutToastr
            })
            console.log("error", error)
        })
        // this.closepopupMeeting();
    }

    save() {
        // Récupérer les valeurs du FormGroup
        const formData = this.demandeF.value;

        //ajouter decision to formData
        // formData['decision'] = "Pour Validation";
        // const selectedClientId = this.clientSelect?.nativeElement.value;

        // console.log('Client Select Element:', this.clientSelect);
        // console.log('Client Select Value:', this.clientSelect?.nativeElement.value);
        console.log("data save",formData)
//         this.servicebc.updateAndAssignToClient(selectedClientId,this.demandeid,formData).subscribe(data => {
//                 this.toastr.success("added successfully" +
//                     "", "", {
//                     closeButton: true,
//                     positionClass: 'toast-top-right',
//                     extendedTimeOut: this.env.extendedTimeOutToastr,
//                     progressBar: true,
//                     disableTimeOut: false,
//                     timeOut: this.env.timeOutToastr
//                 })
// //redirect to demande list
//                 this.router.navigate(['Demande/user']);
//
//             },
//             error => {
//                 this.toastr.error("Failed to add", "", {
//                     closeButton: true,
//                     positionClass: 'toast-top-right',
//                     extendedTimeOut: this.env.extendedTimeOutToastr,
//                     progressBar: true,
//                     disableTimeOut: false,
//                     timeOut: this.env.timeOutToastr
//                 })
//                 console.log("error", error)
//             })
    }
    Retourn(){
        this.router.navigate(['bondecommande/all']);
    }

}
