
import {
  Component,
  ElementRef,
  EventEmitter, inject,
  Input,
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

  demandeid:any;
showadd:boolean=false;


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
    deadline:  new FormControl(''), // Assurez-vous que la propriété deadline est correctement définie dans le formulaire
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
              private cookieService: CookieService
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
      statut: [null, Validators.required],
      source: [''],
      commentaires: [''],
      deadline: [''], // Assurez-vous que la propriété deadline est correctement définie dans le formulaire
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


  ngOnInit(): void {

    this.demandeService.getStatusList().subscribe((statuses) => {
      this.statusList = statuses;
    });

   this.loadClients();
    // recuperer id from url
    // this.demandeService.Initdemande().subscribe(data => {
    //     this.demandeid = data['id'];
    this.demandeid=this.route.snapshot.paramMap.get('id');
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
            if(this.decissionWF=="Pour Validation"){
              this.pourvalidation=true;
              console.log("pourvalidation",this.pourvalidation)
            }else if (this.decissionWF[0]=="Accepter" || this.decissionWF[1]=="Rejeter" || this.decissionWF[2]=="Retourner"){
              this.pourvalidation2=true;
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

  ngOnChanges(changes: SimpleChanges): void {
   // this.changinID(changes.id.currentValue);


  }

  Confirmation(evt) {

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

this.showSuccess();
        // this.router.navigate(['Demande/add/']+this.demandeid);
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
    //ajouter decision to formData
    //  formData['decision'] = "Pour Validation";
    const selectedClientId = this.clientSelect?.nativeElement.value;
    this.demandeDTO['client'] = selectedClientId;
    console.log('Client Select Element:', this.clientSelect);
    console.log('Client Select Value:', this.clientSelect?.nativeElement.value);
    console.log("data save",formData)
    this.demandeService.updateAndAssignToClient(selectedClientId,this.demandeid,formData).subscribe(data => {
          this.toastr.success("added successfully" +
              "", "", {
            closeButton: true,
            positionClass: 'toast-top-right',
            extendedTimeOut: this.env.extendedTimeOutToastr,
            progressBar: true,
            disableTimeOut: false,
            timeOut: this.env.timeOutToastr
          })
//redirect to demande list
            this.router.navigate(['Demande/user']);

        },
        error => {
          this.toastr.error("Failed to add", "", {
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


}
