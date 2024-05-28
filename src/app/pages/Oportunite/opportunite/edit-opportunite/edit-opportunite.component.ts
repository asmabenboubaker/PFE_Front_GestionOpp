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
import {EquipeServiceService} from "../../../../Service/equipe-service.service";
import {DxTreeViewComponent} from "devextreme-angular";
import {EtudetechServiceService} from "../../../../Service/etudetech-service.service";
import {CookieService} from "ngx-cookie-service";
import {OffreService} from "../../../../Service/offre.service";

@Component({
  selector: 'app-edit-opportunite',
  templateUrl: './edit-opportunite.component.html',
  styleUrls: ['./edit-opportunite.component.scss']
})
export class EditOpportuniteComponent implements OnInit {
    oppObject: any;
//set selectedDemand false
  selectedDemande = false;
    equipes: any[] = [];
    equipesaff: any[] = [];
  demandeF: FormGroup;
listIdEquipe: any[] = [];
  oppForm: any;
    techForm: FormGroup;
  oppid: any;
  decissionWF: any;
demandedto: any;
    showModal:boolean=false;
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
elsebool1 = false;
evaluer:boolean=false;
    demandeId: any;

  constructor(private fb: FormBuilder, private opportuniteService: OpportuniteService, private clientService: ClientServiceService,
              private toastr: ToastrService, private env: EnvService, private wsService: WsService,
              private translateService: TranslateService,
              private tokenStorage: TokenStorageService,
              private http: HttpClient,
              private router: Router,
              public route: ActivatedRoute,
              private datePipe: DatePipe,
              private demandeService: DemandeService,
              private equipeService: EquipeServiceService,
              private etudeService: EtudetechServiceService,
                private cookieService: CookieService,
              private offreService: OffreService
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
    // set data from service equipe
      this.gridDataSource=this.getEquipes1();
  }
getEquipes1(){
    this.equipeService.getEquipes().subscribe(
        (equipes: any[]) => {
            this.gridDataSource = equipes;
        },
        (error) => {
            console.error('Erreur lors de la récupération des équipes : ', error);
        }
    );
}

  ngOnInit(): void {
      this.oppid = this.route.snapshot.paramMap.get('id');
//set oppObject
      this.opportuniteService.getOpportuniteByidd(this.oppid).toPromise().then(
          data => {
              this.oppObject = data;
              console.log("oppObject",this.oppObject)
          }
      );
      this.route.queryParams.subscribe(params => {
           this.demandeId = params['demandeId'];
          console.log('ID de la demande:', this.demandeId);

      });
      this.getEquipes();
    this.loaddemandes();

    this.opportuniteService.getOppByid(this.oppid).toPromise().then(
        data => {
          this.demandedto=data;
          this.oppF.get('id').setValue(data.id);
          this.oppF.get('nom').setValue(data.nom);
          this.oppF.get('description').setValue(data.description);
          this.oppF.get('createAt').setValue(data.dateDeCreation);
          this.oppF.get('montantEstime').setValue(data.statut);
          // const clientId = data['client'] ? data['client']['id'] : (this.clients.length > 0 ? this.clients[0].id : null);
          // this.demandeF.get('client').setValue(clientId);
          console.log("Fetched Successfully :",  this.demandedto);
          // Vérifiez si data.workflow est défini avant d'accéder à decisionsWF
         // this.decissionWF = data.workflow && data.workflow.decisionsWF ? data.workflow.decisionsWF : null;
this.decissionWF=data.workflow.decisionsWF;
          //const decisionsWF = data.workflow.decisionsWF
          console.log("DECICIONS WK ::: " + data['workflow']['decisionsWF'])  ;
          // afficher les donnes de data
            console.log("data", data.workflow.decisionsWF);

          //get decissionWF
          this.decissionWF = data['workflow']['decisionsWF'];


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
//['Accepter\n', 'Rejeter\n']
else if(this.decissionWF[0]=="Accepter\n" || this.decissionWF[1]=="Rejeter\n"){
    this.elsebool = true;
}
else {
    this.elsebool1 = true;
       if (this.oppObject.createoffre==false && this.cookieService.get('profiles').includes(this.env.depositOpportunite) && this.demandedto.activityName=="Accepté") {
        this.showModal=true;
    }
}

        },
        error => {
          console.log("Error :", error);
        }
    );

    console.log("this.demandeF", this.oppF)
      this.techForm = this.fb.group({
          membres: [''],
          specialite: [''],
          nbreHours: [''],
          complexite: [''],
          evaluation: ['']
      });

    // set techform data
    this.opportuniteService.getEtudeByOppId(this.oppid).subscribe(
        (data) => {
            console.log("dsdsdsdsdsd");
            console.log('Etude: ', data);
          this.techForm.get('membres').setValue(data[0].membres);
          this.techForm.get('specialite').setValue(data[0].specialite);
          this.techForm.get('nbreHours').setValue(data[0].nbreHours);
          this.techForm.get('complexite').setValue(data[0].complexite);
          this.techForm.get('evaluation').setValue(data[0].evaluation);
        },
        (error) => {
          console.error('Error fetching demande by id: ', error);
        }
    );
    //set list equipe
    this.opportuniteService.getEquipes(this.oppid).subscribe(
        (equipes: any[]) => {
            this.equipesaff = equipes;
            console.log("projet affecter", this.equipesaff)
        },
        (error) => {
            console.error('Erreur lors de la récupération des équipes : ', error);
        }
    );


  }

    affecterOpportuniteAOffre(oppid,offreId): void {
        this.opportuniteService.affecterOpportuniteAOffre(oppid, offreId)
            .subscribe(response => {
                console.log('Opportunite affectée à la demande avec succès:', response);

            }, error => {
                console.error('Erreur lors de l\'affectation de l\'opportunité à la demande:', error);

            });
    }
    onCancelClick(): void {
        this.showModal = false;
    }
    onCreateOpportunityClick(): void {


        this.opportuniteService.setCreateOffreTrue(this.oppid).subscribe(data => {
            console.log("set create opp true",data)

        });
        this.offreService.InitOffre().subscribe(data => {
            const oppId = data['id'];
           this. affecterOpportuniteAOffre(oppId,this.oppid);
          this.router.navigate(['offre/edit/' + oppId], { queryParams: { demandeId: this.oppid } });

            this.showModal = false;
        });
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
        this.opportuniteService.updateAndAssignToDemande(this.oppid,this.oppF.value).subscribe(data => {
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
           // this.router.navigate(['opportunite/all']);


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
  save2(){

      //verifier si equipe selectionner gridBoxValue
        if(this.gridBoxValue.length==0){
            this.toastr.warning("Veuillez sélectionner une équipe", "", {
                closeButton: true,
                positionClass: 'toast-top-right',
                extendedTimeOut: this.env.extendedTimeOutToastr,
                progressBar: true,
                disableTimeOut: false,
                timeOut: this.env.timeOutToastr
            });
            return;
        }
        else {
            // call methode in service affecter
            console.log("equipe affecter", this.gridBoxValue);
            // set listidequipe with id from gridBoxValue
            this.listIdEquipe = this.gridBoxValue.map(equipe => equipe.id);
            this.equipeService.affecterEquipe(this.oppid, this.listIdEquipe).subscribe(
                (data) => {
                    this.toastr.success("Equipe affectée avec succès", "", {
                        closeButton: true,
                        positionClass: 'toast-top-right',
                        extendedTimeOut: this.env.extendedTimeOutToastr,
                        progressBar: true,
                        disableTimeOut: false,
                        timeOut: this.env.timeOutToastr
                    });
                    //redirect to demande list
                    // this.router.navigate(['opportunite/all']);
                },

                (error) => {
                    this.toastr.error("Erreur lors de l'affectation de l'équipe", "", {
                        closeButton: true,
                        positionClass: 'toast-top-right',
                        extendedTimeOut: this.env.extendedTimeOutToastr,
                        progressBar: true,
                        disableTimeOut: false,
                        timeOut: this.env.timeOutToastr
                    });
                }
            );
            const selectedClientId = this.demandeSelect?.nativeElement.value;
            console.log("selected demande:" + selectedClientId);
            this.opportuniteService.updateAndAssignToDemande(this.oppid,this.oppF.value).subscribe(data => {
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
  }

  save3(){

        this.etudeService.createEtudeOpp(this.techForm.value,this.oppid).subscribe(data => {
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
            this.router.navigate(['opportunite/all']);

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
    getEquipes(): void {
        this.equipeService.getEquipes().subscribe(
            (equipes: any[]) => {
                this.equipes = equipes.map(equipe => equipe.nom);
            },
            (error) => {
                console.error('Erreur lors de la récupération des équipes : ', error);
            }
        );
    }
    // affecter equipe
    @ViewChild(DxTreeViewComponent, { static: false }) treeView: DxTreeViewComponent;

    gridDataSource: any;

    gridBoxValue = [];
    onSelectionChanged(e) {
        const selectedIds = e.value;
        // get id projet form url
        const projectId = this.route.snapshot.paramMap.get('id');
        // Make an HTTP request to your API endpoint using the selectedIds

    }

    popupViewerVisible: any = false;
    showPopupWF() {
        this.popupViewerVisible = true;
    }
    popupHeight = window.innerHeight-50;
    popupWidth = window.innerWidth - window.innerWidth / 3;
}
