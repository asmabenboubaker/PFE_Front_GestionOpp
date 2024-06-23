import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
import {HttpClient} from "@angular/common/http";
import {ClientServiceService} from "../../../../Service/client-service.service";
import {OffreService} from "../../../../Service/offre.service";

@Component({
  selector: 'app-add-facture',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.scss']
})
export class AddFactureComponent implements OnInit {

  factureData: any = {
    dateFacture: new Date(),
    dueDate: '',
    invoiceTo: '',
    invoiceAddress: '',
    invoiceContact: '',
    salesperson: '',
    description: '',
    invoiceItems: []
  };
  invoiceItems: any[] = [{
    itemDetails: '',
    itemInformation: '',
    itemCost: 0,
    itemQty: 0,
  }];

  // Calculate totals
  calculateTotals() {
    this.subtotal = this.factureData.invoiceItems.reduce((sum, item) => sum + item.rate * item.qty, 0);
    // Assume discount and tax are percentages for simplicity
    this.discount = this.subtotal * (0 / 100); // Update discount logic as needed
    this.tax = this.subtotal * (0 / 100); // Update tax logic as needed
    this.total = this.subtotal - this.discount + this.tax;
  }
  subtotal: number = 0;
  discount: number = 0;
  tax: number = 0;
  total: number = 0;
  addItem() {
    this.invoiceItems.push({
      itemDetails: '',
      itemInformation: '',
      itemCost: 0,
      itemQty: 0,
    });

    this.calculateTotals();
  }
  calculateTotal(index: number) {
    const item = this.factureData.items[index];
    item.amount = item.qty * item.rate;
  }

  removeItem(index: number) {
    this.invoiceItems.splice(index, 1);
  }
  sendFacture() {
    this.factureData.invoiceItems = [...this.invoiceItems];

    console.log('Before sending:', this.factureData);
    this.http.post<any>('http://localhost:8888/demo_war/api/saveFactureWithItems', this.factureData)
        .subscribe(
            response => {
              console.log('Facture created successfully!', response);
              //navigate to facture list
                this.router.navigate(['Facture/all']);

            },
            error => {
              console.error('Error creating facture', error);
              // Handle error appropriately, show user feedback, etc.
            }
        );
  }
//   sendFacture() {
//     console.log('Invoice Data:', this.factureData);
//     // Assign the items to the facture data
//     this.factureData.items = this.invoiceItems;
// console.log(this.factureData);
//     // Make API call to create facture
//     this.http.post<any>('http://localhost:8888/demo_war/api/saveFactureWithItems', this.factureData)
//         .subscribe(
//             response => {
//               console.log('Facture created successfully!', response);
//               // Optionally reset form or navigate to another page
//             },
//             error => {
//               console.error('Error creating facture', error);
//               // Handle error appropriately, show user feedback, etc.
//             }
//         );
//   }





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
              private http: HttpClient,
              private clientService: ClientServiceService,
              private offreService: OffreService,
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
    //this.addItem();
    //set clients
    console.log("Fetching clients...");
    this.clientService.getAllClientsWithoutPages().subscribe(
        clients => {
          this.clients = clients;
          console.log("Clients fetched:", this.clients);
        },
        error => {
          console.error("Error fetching clients", error);
        }
    );
    // this.invoiceItems = this.factureData.invoiceItems.map(item => ({ ...item }));
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
  clients: any[] = [];
  selectedClient: any | null = null;

  onClientChange(clientId: string): void {
    console.log('Selected Client ID:', clientId);

    const numericClientId = Number(clientId);

    this.clients.forEach(client => console.log(`Client ID: ${client.id}, Type: ${typeof client.id}`));

    this.selectedClient = this.clients.find(client => client.id === numericClientId) || null;
    console.log('Selected Client:', this.selectedClient);
  }


  // toolbar
  backButtonOptions = {
    icon: 'back',
    onClick: () => {
      this.router.navigate(['/Facture/all']);
    }
  };
  addButtonOptions = {
    icon: 'fa fa-download',

    onClick: () => {
      this.downloadPdfOnClick();
    }
  };
  downloadPdfOnClick() {

      const formData = this.factureForm;
      console.log('Form Data:', formData);
      this.offreService.generatePdf2(formData, this.invoiceItems);

  }

}
