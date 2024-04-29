import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DemandeService} from "../../../../Service/demande.service";
import {ClientServiceService} from "../../../../Service/client-service.service";
import {ToastrService} from "ngx-toastr";
import {EnvService} from "../../../../../env.service";
import {WsService} from "../../../../../ws.service";
import {TranslateService} from "@ngx-translate/core";
import {TokenStorageService} from "../../../Global/shared-service/token-storage.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {OpportuniteService} from "../../../../Service/opportunite.service";
import {Client} from "../../../../Models/Client";

@Component({
  selector: 'app-edit-opportunite',
  templateUrl: './edit-opportunite.component.html',
  styleUrls: ['./edit-opportunite.component.scss']
})
export class EditOpportuniteComponent implements OnInit {
//set selectedDemand false
  selectedDemande = false;

  demandeF: FormGroup;

  oppForm: any;
  oppid: any;
  decissionWF: any;
  oppF = new FormGroup({
    id: new FormControl(''),
    nom: new FormControl(''),
    description: new FormControl(''),
    createAt: new FormControl(''),
    montantEstime: new FormControl(''),

  });
  demandes: any[] = [];
  @ViewChild('demandeSelect') demandeSelect: ElementRef;
  creationOpp = false;
  Affectaionequipe = false;
  etude = false;
  rapport = false;
elsebool = false;
evaluer:boolean=false;
  constructor(private fb: FormBuilder, private opportuniteService: OpportuniteService, private clientService: ClientServiceService,
              private toastr: ToastrService, private env: EnvService, private wsService: WsService,
              private translateService: TranslateService,
              private tokenStorage: TokenStorageService,
              private http: HttpClient,
              private router: Router,
              public route: ActivatedRoute,
              private datePipe: DatePipe,
              private demandeService: DemandeService
              ) {
    const currentDate = new Date();
    this.oppForm = this.fb.group({
      id: null, // You might want to initialize other properties based on your requirements
      nom: ['', Validators.required],
      description: null,
      createAt: currentDate,
      montantEstime: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]], // Définir comme nombre à virgule flottante avec validation de modèle

    });
    this.demandeF = this.fb.group({
      nom: [''],
      client: [''],
      statut: [''],
      source: [''],
      commentaires: [''],
      deadline: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loaddemandes();
    this.oppid = this.route.snapshot.paramMap.get('id');
    this.opportuniteService.getOppByid(this.oppid).toPromise().then(
        data => {
          //this.demandeDTO=data
          this.oppF.get('id').setValue(data.id);
          this.oppF.get('nom').setValue(data.nom);
          this.oppF.get('description').setValue(data.description);
          this.oppF.get('createAt').setValue(data.dateDeCreation);
          this.oppF.get('montantEstime').setValue(data.statut);
          // const clientId = data['client'] ? data['client']['id'] : (this.clients.length > 0 ? this.clients[0].id : null);
          // this.demandeF.get('client').setValue(clientId);
          console.log("Fetched Successfully :", data);
          // Vérifiez si data.workflow est défini avant d'accéder à decisionsWF
         // this.decissionWF = data.workflow && data.workflow.decisionsWF ? data.workflow.decisionsWF : null;
this.decissionWF=data.workflow.decisionsWF;
          //const decisionsWF = data.workflow.decisionsWF
          console.log("DECICIONS WK ::: " + data['workflow']['decisionsWF'])  ;
          // afficher les donnes de data
            console.log("data", data.workflow.decisionsWF);

          //get decissionWF
          this.decissionWF = data['workflow']['decisionsWF'];

          // if(this.decissionWF=="Affecter Equipe\n"){
          //   this.creationOpp= true;
          //
          // }else if(this.decissionWF=="Etude\n"){
          //   this.Affectaionequipe = true;
          // }else if(this.decissionWF=="Rapport\n"){
          //   this.etude = true;
          // }else {
          //   this.elsebool = true;
          // }
if(this.decissionWF=="Affecter Equipe\n"){
    this.creationOpp= true;

}else if (this.decissionWF=="Etude \n"){
    this.Affectaionequipe = true;
}
else if (this.decissionWF=="Rapport\n"){
    this.etude = true;
}else if (this.decissionWF=="Evaluer\n"){
    this.rapport = true;
}
else {
    this.elsebool = true;
}
        },
        error => {
          console.log("Error :", error);
        }
    );

    console.log("this.demandeF", this.oppF)

  }

  Confirmation(evt) {

    const formData = this.oppF.value;


    formData['decision'] = evt.decision.trim();
    console.log("decision"+evt.decision) ;
    formData['wfCurrentComment'] = evt.wfCurrentComment;
    console.log("this.demanade CONFIRMATION", formData)

    this.opportuniteService.Opp_process_Submit(formData).subscribe(data => {
      this.toastr.success(" added successfully" +
          "", "", {
        closeButton: true,
        positionClass: 'toast-top-right',
        extendedTimeOut: this.env.extendedTimeOutToastr,
        progressBar: true,
        disableTimeOut: false,
        timeOut: this.env.timeOutToastr
      })
      //redirect to demande list
        window.location.reload();

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


  save(){
    const selectedClientId = this.demandeSelect?.nativeElement.value;
    console.log("selected demande:"+selectedClientId);
    this.opportuniteService.updateAndAssignToDemande(this.oppid,selectedClientId,this.oppF.value).subscribe(data => {
      this.toastr.success(" updated successfully" +
          "", "", {
        closeButton: true,
        positionClass: 'toast-top-right',
        extendedTimeOut: this.env.extendedTimeOutToastr,
        progressBar: true,
        disableTimeOut: false,
        timeOut: this.env.timeOutToastr
      })
      //redirect to add opp by id
        this.router.navigate(['opportunite/all']);


    }, error => {
      this.toastr.error("failed to update ", "", {
        closeButton: true,
        positionClass: 'toast-top-right',
        extendedTimeOut: this.env.extendedTimeOutToastr,
        progressBar: true,
        disableTimeOut: false,
        timeOut: this.env.timeOutToastr
      })
      console.log("error", error)
    })
  }
  Save() {
}
  Retourn(){

  }

  loaddemandes()
  {
    this.opportuniteService.getAllDemandesWithoutPages().subscribe(
        (clients: Client[]) => {
          console.log('Demande: ', clients);
          this.demandes = clients;
        },
        (error) => {
          console.error('Error fetching clients: ', error);
        }
    );
  }


  selectedTeam = '';
  onSelected(value:string): void {
    this.selectedTeam = value;
    console.log("selectedTeam",this.selectedTeam)
    this.selectedDemande= true;
    // findbyid demande and set it to demandeF
    this.demandeService.getDemandeById(this.selectedTeam).subscribe(
        (data) => {
          this.demandeF.get('nom').setValue(data.nom);
          this.demandeF.get('client').setValue(data.client.nom);
          this.demandeF.get('statut').setValue(data.statut);
          this.demandeF.get('source').setValue(data.source);
          this.demandeF.get('commentaires').setValue(data.commentaires);
          this.demandeF.get('deadline').setValue(data.deadline);
          this.demandeF.get('description').setValue(data.description);
        },
        (error) => {
          console.error('Error fetching demande by id: ', error);
        }
    );
  }


  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('file', file);

      this.uploadFile(formData);
    }
  }

  uploadFile(formData: FormData) {
    this.http.post('https://kernel.picosoft.biz/kernel-v1/api/createAttachement', formData)
        .subscribe(
            (response: any) => {
              console.log('File uploaded successfully:', response);
              // Handle response data or update UI accordingly
            },
            (error: any) => {
              console.error('Failed to upload file:', error);
              // Handle error or display error message
            }
        );
  }
}
