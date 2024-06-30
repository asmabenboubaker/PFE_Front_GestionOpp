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
import {DxDataGridComponent, DxTreeViewComponent} from "devextreme-angular";
import {EtudetechServiceService} from "../../../../Service/etudetech-service.service";
import {CookieService} from "ngx-cookie-service";
import {OffreService} from "../../../../Service/offre.service";
import {WebSocketService} from "../../../../Service/web-socket.service";
import {Opportunite} from "../../../../Models/Opportunite";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import CustomStore from "devextreme/data/custom_store";
import { Tab, initMDB } from "mdb-ui-kit";
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import {DxDataGridTypes} from "devextreme-angular/ui/data-grid";

import {AddDetailsComponent} from "../add-details/add-details.component";
import {Observable} from "rxjs";
const TASK_DATA: any[] = [
    {id: 1, name: 'Tâche 1', description: 'Description 1'},
    {id: 2, name: 'Tâche 2', description: 'Description 2'},
];
@Component({
  selector: 'app-edit-opportunite',
  templateUrl: './edit-opportunite.component.html',
  styleUrls: ['./edit-opportunite.component.scss']
})

export class EditOpportuniteComponent implements OnInit {

    oppObject: any;
    oppObjectAccordion: Opportunite[];
//set selectedDemand false
  selectedDemande = false;
    equipes: any[] = [];
    equipesaff: any[] = [];
  demandeF: FormGroup;
listIdEquipe: any[] = [];
  oppForm: any;
    @ViewChild('clientSelect') clientSelect: ElementRef;
    @ViewChild('gridContainer', {static: false}) gridContainer: DxDataGridComponent;

    techForm: FormGroup;
    taskForm: FormGroup;
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
      nomDepartement: new FormControl(''),
      sidDepartement: new FormControl(''),

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
    orders: ArrayStore;

    ClassId: any=31;
    ObjectId: any;
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
              private offreService: OffreService,
              private webSocketService: WebSocketService,


              ) {

      this.demandedto = {
          workflow: {
              wfProcessID: 'some-id',
              historicWF: []
          },
          events: [],
          userActivity: []
      };

      this.taskForm = this.fb.group({
          nom: ['', Validators.required],
          description: ['', Validators.required],
          nbreHours: ['', Validators.required]
      });

   // data grid etude
      this.productsDataSource = new DataSource({
          store: new CustomStore({
              load: () => {
                  return this.etudeService.getAllEtudesByOpportuniteId(this.oppid).toPromise();
              }
          })
      });

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

    detailGridDataSourcesCache: { [key: string]: any } = {};

    getDetailGridDataSource(etude: any) {
        const etudeId = etude.id.toString();

        // Vérifier si la source de données du détail pour cette étude existe déjà dans le cache
        if (!this.detailGridDataSourcesCache[etudeId]) {
            // Si elle n'existe pas, créer une nouvelle source de données et la stocker dans le cache
            this.detailGridDataSourcesCache[etudeId] = new DataSource({
                store: new CustomStore({
                    load: () => {
                        return this.etudeService.getTachesByEtudeId(etude.id).toPromise();
                    }
                })
            });
        }

        // Retourner la source de données du détail pour cette étude à partir du cache
        return this.detailGridDataSourcesCache[etudeId];
    }
    // getDetailGridDataSource(etude: any) {
    //   console.log("tacheeeeeeeeeeeeeeeeeeeeeee"+etude.id)
    //     return new DataSource({
    //         store: new CustomStore({
    //             load: () => {
    //                 return this.etudeService.getTachesByEtudeId(etude.id).toPromise();
    //             }
    //         })
    //     });
    // }

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
      initMDB({ Tab });
      this.oppid = this.route.snapshot.paramMap.get('id');
      this.ObjectId=this.route.snapshot.paramMap.get('id');
//set oppObject
      this.opportuniteService.getOpportuniteByidd(this.oppid).toPromise().then(
          data => {
              this.oppObject = data;
              this.oppObjectAccordion = this.oppObject;
              console.log("oppObject",this.oppObject);
              console.log("oppObjectAccorion :: ",this.oppObject.description);
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

}else if (this.decissionWF[0]=="Pour Validation" || this.decissionWF[1]=="Etude \\n"){
    this.Affectaionequipe = true;
}
else if (this.decissionWF=="Evaluer"){
    this.etude = true;
}else if (this.decissionWF=="Pour Validation"){
    this.etude = true;
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
          nature: ['etudeFaisabilite', Validators.required], // Example text input field
          description: ['', Validators.required], // Another text input field
          specialite: [''], // Specialite field
          nbreHours: ['', Validators.required],
          responsableEtude: ['', Validators.required],
          //date today
          dateDebut: [this.datePipe.transform(new Date(), 'yyyy-MM-dd')],

      });


      // set techform data
    // this.opportuniteService.getEtudeByOppId(this.oppid).subscribe(
    //     (data) => {
    //         console.log("dsdsdsdsdsd");
    //         console.log('Etude: ', data);
    //       this.techForm.get('membres').setValue(data[0].membres);
    //       this.techForm.get('specialite').setValue(data[0].specialite);
    //       this.techForm.get('nbreHours').setValue(data[0].nbreHours);
    //       this.techForm.get('complexite').setValue(data[0].complexite);
    //       this.techForm.get('evaluation').setValue(data[0].evaluation);
    //     },
    //     (error) => {
    //       console.error('Error fetching demande by id: ', error);
    //     }
    // );
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
    onDepartementChange(event) {
        const selectedDepartmentName = event.target.value;
        const selectedDepartment = this.gridDataSource.find(dept => dept.name === selectedDepartmentName);
        if (selectedDepartment) {
            this.oppF.patchValue({
                sidDepartement: selectedDepartment.aclsidMGR
            });
        }
    }
  Confirmation(evt) {

      this.loadingVisible = true;
      console.log("Form values:", this.techForm.value);
      if(this.Affectaionequipe){
          // si l'utilisateur ne select pas equipe toasr error
            if (this.oppF.get('sidDepartement') === null || this.oppF.get('sidDepartement') === undefined ) {
                console.log("Veuillez sélectionner une équipe")
                this.toastr.error("Veuillez sélectionner une équipe", "", {
                    closeButton: true,
                    positionClass: 'toast-top-right',
                    extendedTimeOut: this.env.extendedTimeOutToastr,
                    progressBar: true,
                    disableTimeOut: false,
                    timeOut: this.env.timeOutToastr
                });
                return;
            }
      }
      if (this.etude) {
          console.log("dkhal ll if ")
          this.etudeService.createEtudeOpp(this.techForm.value, this.oppid).subscribe(
              (data :any) => {
                  console.log("data.idddddddddddddd"+data.id)
                  const etudeId = data.id;
                  this.tasks.forEach(task => {
                      this.etudeService.addTachetoetude(etudeId, task).subscribe();
                  });
              },
              (error) => {
                console.log("error",error)
              }

          );
      }

    const formData = this.oppF.value;

    formData['decision'] = evt.decision.trim();
    console.log("decision"+evt.decision) ;
    formData['wfCurrentComment'] = evt.wfCurrentComment;
    console.log("this.demanade CONFIRMATION", formData)

      console.log("Nom Département sélectionné:", formData.nomDepartement);
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
        this.loadingVisible = false;
        this.router.navigate(['opportunite/all']);
        //this.router.navigate(['opportunite/all']);
        if(evt.decision.trim()==="Etude") {
            this.sendNotification(this.oppid);
        }
        if(evt.decision.trim()==="Evaluer") {
            this.sendNotificationEvaluer(this.oppid);
        }
        if(this.elsebool===true){
            this.sendNotificationoffre(this.oppid);
        }
      //redirect to opportunité list



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


      const selecteddemandeid = this.clientSelect?.nativeElement.value;
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


    }

    popupViewerVisible: any = false;
    showPopupWF() {
        this.popupViewerVisible = true;
    }
    popupHeight = window.innerHeight-50;
    popupWidth = window.innerWidth - window.innerWidth / 3;
    username: any;
    sendNotification(demandeId: number) {
        const message = 'Nous vous invitons à étudier cette nouvelle opportunité';
        const url = `/opportunite/add/${demandeId}`;
        this.username = this.cookieService.get('displayname');
        const createdBy=this.username;
        const username="Equipetechnique";
        this.webSocketService.sendNotification({ message, url, createdBy, username });
    }
    sendNotificationEvaluer(demandeId: number) {

        const message = 'Merci de valider cette opportunité dès que possible';
        const url = `/opportunite/add/${demandeId}`;
        this.username = this.cookieService.get('displayname');
        const createdBy=this.username;
        const username="oppDG";
        this.webSocketService.sendNotification({ message, url, createdBy, username });
    }
    sendNotificationoffre(demandeId: number) {

        const message = 'Le processus de l\'opportunité est terminé. Vous pouvez créer une offre de prix.';
        const url = `/opportunite/add/${demandeId}`;
        this.username = this.cookieService.get('displayname');
        const createdBy=this.username;
        const username="depositOpportunite";
        this.webSocketService.sendNotification({ message, url, createdBy, username });
    }
//loading
    loadingVisible = false;

    onShown() {
        setTimeout(() => {
            this.loadingVisible = false;
        }, 3000);
    }

    onHidden() {
        //this.employeeInfo = this.employee;
    }
    //start data grid etude
    productsDataSource: DataSource;
// export on pdf
    onExporting(e: DxDataGridTypes.ExportingEvent) {
        const doc = new jsPDF();
        exportDataGrid({
            jsPDFDocument: doc,
            component: e.component,
            indent: 5,
        }).then(() => {
            doc.save('EtudeOpportunite.pdf');
        });
    }


//data grid tache
    popupVisible = false;
    tasks: any[] = [];

    openPopup() {
        this.popupVisible = true;
    }

    closePopup() {
        this.popupVisible = false;
    }
    addTask() {
        if (this.taskForm.valid) {
            const newTask = {
                ID: this.generateUniqueId(),
                ...this.taskForm.value
            };
            this.tasks.push(newTask);
            this.taskForm.reset();
            this.closePopup();
            this.gridContainer.instance.refresh(); // Refresh the grid to reflect the new data
        }
    }
    generateUniqueId(): number {
        return this.tasks.length > 0 ? Math.max(...this.tasks.map(task => task.id || 0)) + 1 : 1;
    }
    onToolbarPreparing(e) {


        e.toolbarOptions.items.unshift(
            {
                location: 'after',
                template: 'ExportPDF'
            });
        e.toolbarOptions.items.unshift(
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    hint: 'Reset',
                    icon: 'undo',
                    onClick: this.resetGrid.bind(this),
                }
            });
        e.toolbarOptions.items.unshift(
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    hint: 'Refresh',
                    icon: 'refresh',
                    onClick: this.refresh.bind(this),
                }
            });
        e.toolbarOptions.items.unshift({
            location: 'after',
            widget: 'dxButton',
            options: {
                hint: 'Nouveau',
                icon: 'plus',
                onClick: this.openPopup.bind(this),
            },
        });
        e.toolbarOptions.items.unshift(
            {
                location: 'center',
                template: 'Details'
            }
        );


    }
    refresh(){

    }
    resetGrid(){

    }
    deleteDetails(taskId: any) {
        // delete element static from data grid
        console.log("taskId", taskId);
        console.log("Before deletion:", this.tasks);

        //detele form data grid
        this.tasks = this.tasks.filter(task => task.ID !== taskId);

        console.log("After deletion:", this.tasks);

        if (this.gridContainer && this.gridContainer.instance) {
            this.gridContainer.instance.refresh();
            console.log("Grid refreshed");
        } else {
            console.error("Grid container or instance is not defined");
        }
    }

    deleteDetails2(taskId: any) {
        console.log("taskId",taskId);
        this.opportuniteService.deleteDetails(taskId).subscribe(
            () => {
                this.gridContainer.instance.refresh();
                this.popupVisible = false;
            },
            (error) => {
                console.error('Error deleting task:', error);
            }
        );
    }
}
