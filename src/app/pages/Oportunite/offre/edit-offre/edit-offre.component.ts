import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Client} from "../../../../Models/Client";
import {OpportuniteService} from "../../../../Service/opportunite.service";
import {OffreService} from "../../../../Service/offre.service";
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

@Component({
  selector: 'app-edit-offre',
  templateUrl: './edit-offre.component.html',
  styleUrls: ['./edit-offre.component.scss']
})
export class EditOffreComponent implements OnInit {
  opps: any[] = [];
  oppid:any;
  offreForm: any;
  decissionWF:any;
    objectData:any;
  offreF= new FormGroup({
    id: new FormControl(''),
    modePaiement: new FormControl(''),
    montant: new FormControl(''),
    dateLivraison: new FormControl(''),
    description: new FormControl(''),
  });
  constructor(private offreService : OffreService,private fb: FormBuilder,private demandeService: DemandeService,private clientService: ClientServiceService,
              private toastr: ToastrService, private env: EnvService,   private wsService: WsService,
              private translateService: TranslateService,
              private tokenStorage: TokenStorageService,
              private http: HttpClient,
              private router: Router,
              public route: ActivatedRoute,
              private datePipe: DatePipe) {

    this.offreForm = this.fb.group({
        id: null, // You might want to initialize other properties based on your requirements
        modePaiement: ['', Validators.required],
        montant: [null],
        dateLivraison: [null, Validators.required],
        description: null,
        });



  }

  ngOnInit(): void {
    this.loadopps()
    this.oppid=this.route.snapshot.paramMap.get('id');
    this.offreService.getOffreByid(this.oppid).toPromise().then(
        data => {
          this.objectData=data
this.offreF.get('id').setValue(data.id);
this.offreF.get('modePaiement').setValue(data.modePaiement);
this.offreF.get('montant').setValue(data.montant);
this.offreF.get('dateLivraison').setValue(data.dateLivraison);
this.offreF.get('description').setValue(data.description);


          // const clientId = data['client'] ? data['client']['id'] : (this.clients.length > 0 ? this.clients[0].id : null);
          // this.demandeF.get('client').setValue(clientId);
          console.log("Fetched Successfully :", data);
          // Vérifiez si data.workflow est défini avant d'accéder à decisionsWF
          this.decissionWF = data.workflow && data.workflow.decisionsWF ? data.workflow.decisionsWF : null;

          //const decisionsWF = data.workflow.decisionsWF
          console.log("DECICIONS WK ::: "+ this.decissionWF);


          //get decissionWF
          this.decissionWF = data['workflow']['decisionsWF'];

        },
        error => {
          console.log("Error :", error);
        }
    );
  }
  loadopps()
  {
    this.offreService.getAllOppWithoutPages().subscribe(
        (clients: Client[]) => {
          console.log('opp: ', clients);
          this.opps = clients;
        },
        (error) => {
          console.error('Error fetching opp: ', error);
        }
    );
  }

  Confirmation(evt) {

    const formData = this.offreF.value;



    formData['decision'] = evt.decision.trim();
    formData['wfCurrentComment'] = evt.wfCurrentComment;
    console.log("this.demanade CONFIRMATION",formData)

    this.offreService.Offre_process_Submit(formData).subscribe(data => {
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
        this.router.navigate(['offre/user']);
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

  @ViewChild('OppSelect') OppSelect: ElementRef;
  save() {
    // Récupérer les valeurs du FormGroup
    const formData = this.offreF.value;

    //ajouter decision to formData
    formData['decision'] = "Pour Validation";
    const selectedOppId = this.OppSelect?.nativeElement.value;
    // this.offreDTO['client'] = selectedOppId;
    console.log('Client Select Element:', this.OppSelect);
    console.log('Client Select Value:', this.OppSelect?.nativeElement.value);
    console.log("data save",formData)
    this.offreService.updateAndAssignToOpp(selectedOppId,this.oppid,formData).subscribe(data => {
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
            this.router.navigate(['offre/all']);

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

}
