import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Facture} from "../../../../Models/Facture";
import {DemandeService} from "../../../../Service/demande.service";
import {FactureService} from "../../../../Service/facture.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {DemandeDto} from "../../../../Models/DemandeDto";
import {FactureDTO} from "../../../../Models/FactureDTO";
import {ToastrService} from "ngx-toastr";
import {EnvService} from "../../../../../env.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-add-facture',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.scss']
})
export class AddFactureComponent implements OnInit {
  invoiceItems: any[] = [];
  addItem() {
    this.invoiceItems.push({
      itemDetails: '',
      itemInformation: '',
      itemCost: 0,
      itemQty: 1
    });
  }
  removeItem(index: number) {
    this.invoiceItems.splice(index, 1);
  }
  factureForm: FormGroup ;
  facture = new FactureDTO(null, null, null, null);
  eventvalueworkflow:any;
  disabled = true;
  eventcontrole=false;
  show_sous_comp: any = false;
  identifiant;
  iddemande: any;
  gridBoxValue = [];
  popupconfirmationsave: boolean=false;
  constructor(private fb: FormBuilder,private factureService: FactureService,
              private router: Router,
              public route: ActivatedRoute,
              private datePipe: DatePipe,
                private demandeService: DemandeService,
                private translateService: TranslateService,
                private toastr: ToastrService,
                private env: EnvService,
              ) {

    this.factureForm = this.fb.group({
      dateFacture: [null, Validators.required],
      description: [null, Validators.required],
      serviceFournis: [null, Validators.required],
      isGenerate: [false],
      nom: [null, Validators.required],
      paymentMethod: [null, Validators.required],
      totalAmount: [null, Validators.required],
      contactNumber: [null, Validators.required],
      uuid: [null],
      // Assurez-vous d'ajouter d'autres champs de votre entité Facture si nécessaire
    });

    if (this.route.snapshot.params['id'] != undefined) {
      // this.factureService.getDemandeDTO(this.route.snapshot.params['id']).subscribe((data: any) => {
      //   this.facture = data;
      //   console.log(data)
      //   this.identifiant = data.identifiant
      //   this.iddemande = data.id
      //   // this.Demandedossier(data.id, undefined)
      //   this.show_sous_comp = true;
     // })

    } else {
     // this.demande.datedemande = this.datePipe.transform(this.currentdate, 'dd-MM-yyyy');
    }
  }

  ngOnInit(): void {

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
      this.router.navigate(['Demande/user']);

    }else {

      this.popupconfirmationsave = true;

    }

  }
}
