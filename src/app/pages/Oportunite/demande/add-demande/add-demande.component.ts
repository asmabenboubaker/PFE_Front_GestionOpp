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
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  demandeForm: FormGroup;
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
    if (this.route.snapshot.params['id'] != undefined) {
      this.demandeService.getDemandeById(this.route.snapshot.params['id']).subscribe((data: any) => {
        this.demande = data;
        this.identifiant = data.identifiant
        this.iddemande = data.id
       // this.Demandedossier(data.id, undefined)
        this.show_sous_comp = true;
      })

    } else {
      this.demande.datedemande = this.datePipe.transform(this.currentdate, 'dd-MM-yyyy');
    }
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


  initializeForm(): void {
    this.demandeForm = this.fb.group({
      id: [null],
      nom: ['', Validators.required],
      description: [null],
      dateDeCreation: [null],
      statutDemande: [null],
      statut: [null],

    });
  }
  ngOnInit(): void {
    this.demandeService.getStatusList().subscribe((statuses) => {
      this.statusList = statuses;
    });

    this.loadClients();



  }
  ngOnChanges(changes: SimpleChanges): void {
    this.changinID(changes.id.currentValue);
  }
  changinID(id){
    this.initializeForm();
    if(this.id){
      this.demandeService.getDemandeById(this.id).subscribe((result) => {

            this.demandeForm.get('id').setValue(result['id']);
            this.demandeForm.get('nom').setValue(result['nom']);
            this.demandeForm.get('description').setValue(result['description']);
        this.demandeForm.get('statut').setValue(result['statut']);

          }
      );
    }
  }

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
        const demandeData: Demande = this.demandeForm.value as Demande;

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


  Ajouteremprunt(f) {
    const demandeData: Demande = this.demandeForm.value as Demande;
    const selectedClientId = this.clientSelect.nativeElement.value;
    //console.log(this.demandeemprunt)
    this.demandeForm = f.value;
    // //console.log("validite ",f.valid) ;

    if (this.demandeForm.value === null) {
      this.toastr.error("Type Demande Obligatoire")
    } else {

      //this.demandeemprunt.datedemande = this.datePipe.transform(this.currentdate, 'yyyy-MM-dd');
      this.demandeService.createDemandeAndAssignToClient(selectedClientId, demandeData)
          .subscribe((data: any) => {

            this.router.navigate(['Demande/user']);
          }, error => {
            console.log("Handle error");
          });

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
}
