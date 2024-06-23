import { Component, OnInit } from '@angular/core';
import {FactureService} from "../../../../Service/facture.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {OffreService} from "../../../../Service/offre.service";

@Component({
  selector: 'app-edit-facture',
  templateUrl: './edit-facture.component.html',
  styleUrls: ['./edit-facture.component.scss']
})
export class EditFactureComponent implements OnInit {
  factureData: any = {
    dateFacture: '',
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
  constructor(private route: ActivatedRoute, private factureService: FactureService, private http: HttpClient, private router: Router,
              private offreService: OffreService

  ) { }
  removeItem(index: number) {
    this.invoiceItems.splice(index, 1);
  }
  calculateTotals() {
    this.subtotal = this.factureData.items.reduce((sum, item) => sum + item.rate * item.qty, 0);
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
  ngOnInit(): void {
    const factureId = +this.route.snapshot.paramMap.get('id');
    this.loadFacture(factureId);
    this.listItem();
  }
  listItem(){
    this.factureService.getItemsByFactureId(+this.route.snapshot.paramMap.get('id')).subscribe(data=>{
        this.invoiceItems = data;
        console.log('items:', data);
    })
  }
  loadFacture(id: number): void {
    this.factureService.getFactureById(id).subscribe(
        (facture: any) => {
          this.factureData = facture;
          console.log('Facture chargée:', facture);
          this.invoiceItems= facture.invoiceItems;

        },
        error => {
          console.error('Erreur lors du chargement de la facture', error);
          // Gérer l'erreur comme nécessaire (affichage d'un message d'erreur, navigation vers une autre page, etc.)
        }
    );
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
    const formData = this.factureData;
    console.log('Form Data:', formData);
    this.offreService.generatePdf2(formData, this.invoiceItems);

  }
}
