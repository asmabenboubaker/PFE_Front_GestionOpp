
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DemandeService} from "../../../../Service/demande.service";
import {Demande} from "../../../../Models/Demande";
import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
import {Paging} from "../../../Global/ps-tools/class";
import {DemandeDto} from "../../../../Models/DemandeDto";
import {DatePipe} from "@angular/common";

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
  clients: Client[] = [];
  eventvalueworkflow:any;
  disabled = true;
  eventcontrole=false;
  show_sous_comp: any = false;
  identifiant;
  iddemande: any;
  popupDeleteVisible: boolean=false;
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
    statutDemande: new FormControl(''),
    statut: new FormControl(''),
    client: new FormControl(''),

  });

  showComment:boolean=false;
  acces:boolean=false;
  GRIDacces:boolean=false;
  DemandeDTO: any = {}
  @Output() JsonDocViewerFromFormToComponent: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() AppelWsGetById: EventEmitter<any> = new EventEmitter<any>();
  userPermission:any;
  decissionWF:any;
  demande_Dto = this.fb.group({
    id: null, // You might want to initialize other properties based on your requirements
    nom: ['', Validators.required],
    description: null,
    dateDeCreation: null,
    statutDemande: null,
    statut: [null, Validators.required],
    client: [null]

  });
  dataSourcePays
  constructor(private fb: FormBuilder,private demandeService: DemandeService,private clientService: ClientServiceService,
              private toastr: ToastrService, private env: EnvService,   private wsService: WsService,
              private translateService: TranslateService,
              private tokenStorage: TokenStorageService,
              private http: HttpClient,
              private router: Router,
              public route: ActivatedRoute,
              private datePipe: DatePipe
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
      id: null, // You might want to initialize other properties based on your requirements
      nom: ['', Validators.required],
      description: null,
      dateDeCreation: currentDate,
      statutDemande: null,
      statut: [null, Validators.required],
      // client: [null, Validators.required]
    });
  }
  GetjsonDowViewerFromAttatchement(e) {
    this.JsonDocViewerFromFormToComponent.emit(e)
  }
  getById(id) {
    console.log("inWebServiceGetByID")
    this.AppelWsGetById.emit(true)
  }

  initForm(item): void {

    this.demandeF = item

    this.demandeForm = new FormGroup({
      id: new FormControl(item?.id),
      caseId: new FormControl(item?.id),
      dateDebut: new FormControl(item?.dateDebut),
      subject: new FormControl(item?.subject),
      partie: new FormControl(item?.partie),
      description: new FormControl(item?.description),

    });

  }
  ngOnInit(): void {
    this.demandeService.getStatusList().subscribe((statuses) => {
      this.statusList = statuses;
    });

   this.loadClients();
    // recuperer id from url


      this.demandeService.getDemandeByid(this.route.snapshot.params['id']).toPromise().then(
          data => {
            this.demandeDTO=data
            this.demandeF.get('id').setValue(data.id);
            this.demandeF.get('nom').setValue(data.nom);
            this.demandeF.get('description').setValue(data.description);
            this.demandeF.get('dateDeCreation').setValue(data.dateDeCreation);
            this.demandeF.get('statut').setValue(data.statut);
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

          },
          error => {
            console.log("Error :", error);
          }
      );
      console.log("this.demandeF",this.demandeF)

  }

  ngOnChanges(changes: SimpleChanges): void {
   // this.changinID(changes.id.currentValue);


  }

  Confirmation(evt) {

    this.demandeDTO['nom'] = this.demandeF.get('nom').value
    this.demandeDTO['description'] = this.demandeF.get('description').value
    this.demandeDTO['statut'] = this.demande_Dto.get('statut').value
    this.demandeDTO['dateDeCreation'] = this.demande_Dto.get('dateDeCreation').value
    this.demandeDTO['client'] = this.demande_Dto.get('client').value
    this.demandeDTO['decision'] = evt.decision
    this.demandeDTO['wfCurrentComment ']= evt.wfCurrentComment
    console.log("this.demanade CONFIRMATION",this.demandeF)

    this.demandeService.Demande_process_Submit(this.demandeF).subscribe(data => {
      this.toastr.success(" added successfully" +
          "", "", {
        closeButton: true,
        positionClass: 'toast-top-right',
        extendedTimeOut: this.env.extendedTimeOutToastr,
        progressBar: true,
        disableTimeOut: false,
        timeOut: this.env.timeOutToastr
      })
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
  Retourn(){

  }

  save() {
    // Récupérer les valeurs du FormGroup
    const formData = this.demandeF.value;

    // Utiliser les valeurs extraites
    this.demandeDTO['nom'] = formData['nom'];
    this.demandeDTO['description'] = formData['description'];
    this.demandeDTO['statut'] = formData['statut'];
    this.demandeDTO['dateDeCreation'] = formData['dateDeCreation'];
    console.log("this.DemandeDTO save",this.demandeDTO)
    this.demandeService.Demande_process_Submit(this.demande_Dto).subscribe(data => {
          this.toastr.success("تمت الإضافة بنجاح " +
              "", "", {
            closeButton: true,
            positionClass: 'toast-top-right',
            extendedTimeOut: this.env.extendedTimeOutToastr,
            progressBar: true,
            disableTimeOut: false,
            timeOut: this.env.timeOutToastr
          })


        },
        error => {
          this.toastr.error("خطأ في تحميل البيانات ", "", {
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
            this.translateService.get("postWithSuccess").subscribe((res) => {
              this.toastr.success(res, "", {
                closeButton: true,
                positionClass: 'toast-top-right',
                extendedTimeOut: this.env.extendedTimeOutToastr,
                progressBar: true,
                disableTimeOut: false,
                timeOut: this.env.timeOutToastr
              })
            })
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
}
