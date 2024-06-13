
import {
  Component,
  ElementRef,
  EventEmitter, inject,
  Input, NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges, TemplateRef,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Client} from "../../../../Models/Client";
import {ClientServiceService} from "../../../../Service/client-service.service";
import {ToastrService} from "ngx-toastr";
import {EnvService} from "../../../../../env.service";
import {WsService} from "../../../../../ws.service";
import {TranslateService} from "@ngx-translate/core";
import {TokenStorageService} from "../../../Global/shared-service/token-storage.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DemandeService} from "../../../../Service/demande.service";

import {Demande} from "../../../../Models/Demande";
import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
import {Paging} from "../../../Global/ps-tools/class";
import {DemandeDto} from "../../../../Models/DemandeDto";
import {DatePipe} from "@angular/common";
import {ToastService} from "../../../../Service/toast-service";
import {CookieService} from "ngx-cookie-service";
import {OpportuniteService} from "../../../../Service/opportunite.service";
import {OffreService} from "../../../../Service/offre.service";
import {WebSocketService} from "../../../../Service/web-socket.service";
declare var webkitSpeechRecognition;
@Component({
  selector: 'app-add-demande',
  templateUrl: './add-demande.component.html',
  styleUrls: ['./add-demande.component.scss']
})
export class AddDemandeComponent implements OnInit,OnChanges {
  @Output() add = new EventEmitter<boolean>();
  @Input() id: string;
  demandeForm: any;
  demandeDTO: any = {}
  private msg: string = 'defaultErrorMessageKey';
  pageSize = this.env.pageSize;
  allowedPageSizes = this.env.allowedPageSizes;
  statusList: string[] = [];
  clients: any[] = [];
  cats: any = [];
  eventvalueworkflow:any;
  disabled = true;
  eventcontrole=false;

  selectedDomaines: number[] = [];
  demandeid:any;
showModal:boolean=false;
  oppadd:any;
demandeObejct:any;
  ClassId:any;
  ObjectId:any;
  demande = new DemandeDto(null, null, null, null)
  gridBoxValue = [];
  gridBoxValueexp:any = [];
  currentdate = new Date();
  @ViewChild('clientSelect') clientSelect: ElementRef;
  // last add
  demandeF= new FormGroup({
    id: new FormControl(''),
    nom: new FormControl(''),
    description: new FormControl(''),
    dateDeCreation: new FormControl(''),
    statut: new FormControl(''),
    source: new FormControl(''),
    commentaires: new FormControl(''),
    deadline:  new FormControl(''),
    client:  new FormControl('')
    // deadline: new FormControl('')

  });

  @Output() AppelWsGetById: EventEmitter<any> = new EventEmitter<any>();
  userPermission:any;
  decissionWF:any;
  objectData:any;

  pourvalidation : boolean=false;
  pourvalidation2 : boolean=false;
  elsedesision:boolean=false;
  listIddomainde: any[] = [];
 //document
  @Output() JsonDocViewerFromFormToComponent: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  constructor(private fb: FormBuilder,private demandeService: DemandeService,private clientService: ClientServiceService,
              private toastr: ToastrService, private env: EnvService,   private wsService: WsService,
              private translateService: TranslateService,
              private tokenStorage: TokenStorageService,
              private http: HttpClient,
              private router: Router,
              public route: ActivatedRoute,
              private datePipe: DatePipe,
              private cookieService: CookieService,
              private opportuniteService:OpportuniteService,
              private offreService: OffreService,
              private formBuilder: FormBuilder,
              private webSocketService: WebSocketService,
              private ngZone: NgZone
  ) {


    // this.initializeForm();
    // if(this.id){
    //   this.demandeService.getDemandeById(this.id).subscribe((result) => {
    //
    //         this.demandeForm.get('id').setValue(result['id']);
    //         this.demandeForm.get('nom').setValue(result['nom']);
    //         this.demandeForm.get('description').setValue(result['description']);
    //     this.demandeForm.get('statut').setValue(result['statut']);
    //
    //       }
    //   );
    // }
    const currentDate = new Date();
    this.demandeForm = this.fb.group({
      id: null,
      nom: ['', Validators.required],
      description: null,
      dateDeCreation: currentDate,
      statut: [null, Validators.required],
      source: [''],
      commentaires: [''],
      deadline: [''],
      client: ['']
    });
  }
  GetjsonDowViewerFromAttatchement(e) {
    this.JsonDocViewerFromFormToComponent.emit(e)
  }
  getById() {
    console.log("inWebServiceGetByID")
    this.AppelWsGetById.emit(true)
  }
  onCancelClick(): void {
    this.showModal = false;
  }
  affecterOpportuniteADemande(oppid,demandeId): void {
    this.opportuniteService.affecterOpportuniteADemande(oppid, demandeId)
        .subscribe(response => {
          console.log('Opportunite affectée à la demande avec succès:', response);

        }, error => {
          console.error('Erreur lors de l\'affectation de l\'opportunité à la demande:', error);

        });
  }
  onCreateOpportunityClick(): void {



    //set createOpp to true
    this.demandeService.setCreateOppTrue(this.demandeid).subscribe(data => {
       // console.log("set create opp true",data)

    });
    this.opportuniteService.InitOpp().subscribe(data => {
      this.oppadd = data['id'];
      this.affecterOpportuniteADemande(this.oppadd,this.demandeid);
      this.router.navigate(['opportunite/add/'+this.oppadd], { queryParams: { demandeId: this.demandeid } });
      this.showModal = false;
    });

  }

  ngOnInit(): void {
    this.demandeF =  this.fb.group({
        id: new FormControl(''),
        nom:['', Validators.required],
        description:['', Validators.required],
        dateDeCreation:['', Validators.required],
        statut:['', Validators.required],
        source: ['', Validators.required],
        commentaires: ['', Validators.required],
        deadline:  ['', Validators.required],
        client: ['', Validators.required]
        // deadline: new FormControl('')
    });

    this.demandeid=this.route.snapshot.paramMap.get('id');
    this.ClassId=27;
    this.ObjectId=this.route.snapshot.paramMap.get('id');
    // list cats
    this.demandeService.getCategories().subscribe((cats) => {
      this.cats = cats;
      console.log("cats",this.cats)
    });
    this.demandeService.getStatusList().subscribe((statuses) => {
      this.statusList = statuses;
    });
// get by id
    this.demandeService.getDemandeByidd(this.demandeid).subscribe((result) => {
// set demandeObject
          this.demandeObejct=result;
          console.log("eeeee"+this.demandeObejct.createOpp)


        }

    );
   this.loadClients();
    // recuperer id from url
    // this.demandeService.Initdemande().subscribe(data => {
    //     this.demandeid = data['id'];

      this.demandeService.getDemandeByid(this.demandeid).toPromise().then(
          data => {
            this.objectData=data
            this.demandeF.get('id').setValue(data.id);
            this.demandeF.get('nom').setValue(data.nom);
            this.demandeF.get('description').setValue(data.description);
            this.demandeF.get('dateDeCreation').setValue(data.dateDeCreation);
            this.demandeF.get('statut').setValue(data.statut);
            this.demandeF.get('source').setValue(data.source);
            this.demandeF.get('commentaires').setValue(data.commentaires);
            //set date
            this.demandeF.get('deadline').setValue(this.datePipe.transform(data.deadline, 'yyyy-MM-dd'));

            const clientId = data['client'] ? data['client']['id'] : (this.clients.length > 0 ? this.clients[0].id : null);
            this.demandeF.get('client').setValue(clientId);
            this.demandeF.patchValue(data);

            console.log("Fetched Successfully :", data);
            // Vérifiez si data.workflow est défini avant d'accéder à decisionsWF
            this.decissionWF = data.workflow && data.workflow.decisionsWF ? data.workflow.decisionsWF : null;

            //const decisionsWF = data.workflow.decisionsWF
            console.log("DECICIONS WK ::: "+ this.decissionWF);

            //get decissionWF
            this.decissionWF = data['workflow']['decisionsWF'];
            //check decision
            if(this.decissionWF=="Pour Validation"){
              this.pourvalidation=true;
              console.log("pourvalidation",this.pourvalidation)
            }else if (this.decissionWF[0]=="Accepter" || this.decissionWF[1]=="Rejeter" || this.decissionWF[2]=="Retourner"){
              this.pourvalidation2=true;
            }
            else {

              this.elsedesision=true;
              console.log("else"+this.elsedesision);

              if (this.demandeObejct.createOpp==false && this.objectData.activityName=="Accepté") {
                this.showModal=true;
              }
            }
          },
          error => {
            console.log("Error :", error);
          }
      );


      console.log("this.demandeF",this.objectData)



  }

  ngOnChanges(changes: SimpleChanges): void {
   // this.changinID(changes.id.currentValue);


  }

  Confirmation(evt) {


    this.loadingVisible = true;


    this.listIddomainde = this.gridBoxValue.map(equipe => equipe.id);
if(this.listIddomainde.length!=0) {
  this.demandeService.affecterDomaines(this.demandeid, this.listIddomainde).subscribe({
    next: (response) => {
      console.log('Domaines affectés:', response);
      this.updateAndAssignToClient();
    },
    error: (error) => {
      this.toastr.error("Failed to affect domaines", "", {
        closeButton: true,
        positionClass: 'toast-top-right',
        extendedTimeOut: this.env.extendedTimeOutToastr,
        progressBar: true,
        disableTimeOut: false,
        timeOut: this.env.timeOutToastr
      });
      console.log("error", error);
    }
  });

}

    const formData = this.demandeF.value;

    // Utiliser les valeurs extraites
    this.demandeDTO['nom'] = formData['nom'];
    this.demandeDTO['description'] = formData['description'];
    this.demandeDTO['statut'] = formData['statut'];
    this.demandeDTO['dateDeCreation'] = formData['dateDeCreation'];

    // this.demandeDTO['decision'] = evt.decision
    // this.demandeDTO['wfCurrentComment ']= evt.wfCurrentComment
    formData['decision'] = evt.decision;
    formData['wfCurrentComment'] = evt.wfCurrentComment;
    console.log("this.demanade CONFIRMATION",formData)

    this.demandeService.Demande_process_Submit(formData).subscribe(data => {
      if (evt.decision.trim() === 'Pour Validation') {
        console.log("Sending notification");
        this.sendNotification(this.demandeid);
      }
    // this.showSuccess();
       // window.location.reload();
      //return to demande list
        this.router.navigate(['Demande/user']);

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



  save() {
    if(this.gridBoxValue.length==0){
      this.toastr.warning("Veuillez sélectionner categorie", "", {
        closeButton: true,
        positionClass: 'toast-top-right',
        extendedTimeOut: this.env.extendedTimeOutToastr,
        progressBar: true,
        disableTimeOut: false,
        timeOut: this.env.timeOutToastr
      });
      return;
    }

    const formData = this.demandeF.value;

    // Use Object.assign to update demandeDTO
    Object.assign(this.demandeDTO, {
      nom: formData.nom,
      description: formData.description,
      statut: formData.statut,
      dateDeCreation: formData.dateDeCreation,
      client: this.clientSelect?.nativeElement.value
    });

    console.log('Client Select Element:', this.clientSelect);
    console.log('Client Select Value:', this.clientSelect?.nativeElement.value);
    console.log("data save", formData);
    console.log("demainde affecter", this.gridBoxValue);

    this.listIddomainde = this.gridBoxValue.map(equipe => equipe.id);

    this.demandeService.affecterDomaines(this.demandeid, this.listIddomainde).subscribe({
      next: (response) => {
        console.log('Domaines affectés:', response);

     this.updateAndAssignToClient();
      },
      error: (error) => {
        this.toastr.error("Failed to affect domaines", "", {
          closeButton: true,
          positionClass: 'toast-top-right',
          extendedTimeOut: this.env.extendedTimeOutToastr,
          progressBar: true,
          disableTimeOut: false,
          timeOut: this.env.timeOutToastr
        });
        console.log("error", error);
      }
    });
    this.router.navigate(['Demande/user']);
  }

  private updateAndAssignToClient() {
    const selectedClientId = this.clientSelect?.nativeElement.value;
    const formData = this.demandeF.value;

    this.demandeService.updateAndAssignToClient(selectedClientId, this.demandeid, formData).subscribe({
      next: (data) => {
        this.toastr.success("Added successfully", "", {
          closeButton: true,
          positionClass: 'toast-top-right',
          extendedTimeOut: this.env.extendedTimeOutToastr,
          progressBar: true,
          disableTimeOut: false,
          timeOut: this.env.timeOutToastr
        });

        // Redirect to demande list
        //this.router.navigate(['Demande/user']);
      },
      error: (error) => {
        this.toastr.error("Failed to add", "", {
          closeButton: true,
          positionClass: 'toast-top-right',
          extendedTimeOut: this.env.extendedTimeOutToastr,
          progressBar: true,
          disableTimeOut: false,
          timeOut: this.env.timeOutToastr
        });
        console.log("error", error);
      }
    });
  }



//   save() {
//     // Récupérer les valeurs du FormGroup
//     const formData = this.demandeF.value;
//
//     // Utiliser les valeurs extraites
//     this.demandeDTO['nom'] = formData['nom'];
//     this.demandeDTO['description'] = formData['description'];
//     this.demandeDTO['statut'] = formData['statut'];
//     this.demandeDTO['dateDeCreation'] = formData['dateDeCreation'];
//     //ajouter decision to formData
//     //  formData['decision'] = "Pour Validation";
//     const selectedClientId = this.clientSelect?.nativeElement.value;
//     this.demandeDTO['client'] = selectedClientId;
//     console.log('Client Select Element:', this.clientSelect);
//     console.log('Client Select Value:', this.clientSelect?.nativeElement.value);
//     console.log("data save",formData)
//     this.demandeService.affecterDomaines(this.demandeid, this.selectedDomaines).subscribe(response => {
//       console.log('Domaines affectés:', response);
//
//     });
//     this.demandeService.updateAndAssignToClient(selectedClientId,this.demandeid,formData).subscribe(data => {
//           this.toastr.success("added successfully" +
//               "", "", {
//             closeButton: true,
//             positionClass: 'toast-top-right',
//             extendedTimeOut: this.env.extendedTimeOutToastr,
//             progressBar: true,
//             disableTimeOut: false,
//             timeOut: this.env.timeOutToastr
//           })
// //redirect to demande list
//             this.router.navigate(['Demande/user']);
//
//         },
//         error => {
//           this.toastr.error("Failed to add", "", {
//             closeButton: true,
//             positionClass: 'toast-top-right',
//             extendedTimeOut: this.env.extendedTimeOutToastr,
//             progressBar: true,
//             disableTimeOut: false,
//             timeOut: this.env.timeOutToastr
//           })
//           console.log("error", error)
//         })
//   }

  // changinID(id){
  //   this.initializeForm();
  //   if(this.id){
  //     this.demandeService.getDemandeById(this.id).subscribe((result) => {
  //
  //           this.demandeForm.get('id').setValue(result['id']);
  //           this.demandeForm.get('nom').setValue(result['nom']);
  //           this.demandeForm.get('description').setValue(result['description']);
  //           this.demandeForm.get('statut').setValue(result['statut']);
  //
  //         }
  //     );
  //   }
  // }

  Return() {

    this.add.emit(false)
    this.router.navigate(['Demande/user']);
  }
  onSubmit() {
    console.log('test');
    try {
      const demandeData: Demande = this.demandeForm.value as Demande;
      const selectedClientId = this.clientSelect.nativeElement.value;
      console.log('Selected client ID:', selectedClientId);
      if (this.id ) {


        this.demandeForm.value.id = this.id;

        this.demandeService.updateDemande(this.id,demandeData)
            .subscribe((data: any) => {

              this.Return();

            }, error => {
              console.log("Handle error");
            });
      } else {

        if(this.demandeForm.valid) {

          this.demandeService.createDemandeAndAssignToClient(selectedClientId, demandeData)
              .subscribe((data: any) => {

                this.router.navigate(['Demande/user']);
              }, error => {
                console.log("Handle error");
              });

        }else {
          if (!this.demandeForm.value.nom) {
            this.toastr.error('Merci de saisir le nom ');
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
  nextTask(e: any) {
    this.eventvalueworkflow=e
    this.disabled = true
    if (!this.eventcontrole) {

      let readers = null;

      e.intervenants = this.gridBoxValue;
      this.demandeService.postDemandeWF(e, null, null, e.commentaire).subscribe(data => {

            this.disabled = false;

          },
          error => {
            this.toastr.error(error.error.message, "", {
              closeButton: true,
              positionClass: 'toast-top-right',
              extendedTimeOut: this.env.extendedTimeOutToastr,
              progressBar: true,
              disableTimeOut: false,
              timeOut: this.env.timeOutToastr
            })
          })
      this.router.navigate(['Archive/DemandeNumerisation']);

    }else {



    }

  }

  loadClients()
  {
    this.clientService.getAllClientsWithoutPages().subscribe(
        (clients: Client[]) => {
          console.log('Clients: ', clients);
          this.clients = clients;
        },
        (error) => {
          console.error('Error fetching clients: ', error);
        }
    );
  }

    showSuccess() {
      this.toastr.info("Le formulaire a été soumis avec succès!", "Succès", {
        titleClass: "center",
        messageClass: "center"
      });
    }

username:any;
  sendNotification(demandeId: number) {

    const message = 'Nouvelle demande pour validation';
    const url = `/Demande/add/${demandeId}`;
    this.username = this.cookieService.get('displayname');
    const createdBy=this.username;
    const username="oppDG";
    this.webSocketService.sendNotification({ message, url, createdBy, username });
  }
  popupViewerVisible: any = false;
  showPopupWF() {
    this.popupViewerVisible = true;
  }
  popupHeight = window.innerHeight-50;
  popupWidth = window.innerWidth - window.innerWidth / 3;

  // load data
  loadingVisible = false;

  onShown() {
    setTimeout(() => {
      this.loadingVisible = false;
    }, 3000);
  }

  onHidden() {
    //this.employeeInfo = this.employee;
  }

  //mic

  recognition: any;
  isListening = false;
  results;
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
        this.demandeF.get('description').setValue(this.results);
        // console.log(this.results);
        vSearch.stop();
      };
    } else {
      alert('Your browser does not support voice recognition!');
    }
  }

}
