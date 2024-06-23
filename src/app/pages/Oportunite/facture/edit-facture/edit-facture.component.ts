import { Component, OnInit } from '@angular/core';
import {FactureService} from "../../../../Service/facture.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {OffreService} from "../../../../Service/offre.service";
import {ClientServiceService} from "../../../../Service/client-service.service";

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
              private offreService: OffreService, private clientService: ClientServiceService

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
    this.loadClients();
  }
  loadClients(): void {
    this.clientService.getAllClientsWithoutPages().subscribe(
        clients => {
          this.clients = clients;
          // Set selected client if factureData.client exists
          if (this.factureData.client) {
            this.selectedClient = this.clients.find(client => client.id === this.factureData.client.id) || null;
          }
        },
        error => {
          console.error("Error fetching clients", error);
        }
    );
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
    //update facture
    this.factureData.invoiceItems = [...this.invoiceItems];
    this.factureService.updateAndAssignFacture(this.factureData, this.selectedClient.id, +this.route.snapshot.paramMap.get('id')).subscribe(
        response => {
          console.log('Facture créée et affectée avec succès!', response);
          this.router.navigate(['Facture/all']);
        },
        error => {
          console.error('Erreur lors de la création et de l\'affectation de la facture', error);
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
  clients: any[] = [];
  selectedClient: any | null = null;
  onClientChange(clientId: string): void {
    console.log('Selected Client ID:', clientId);

    const numericClientId = Number(clientId);

    this.clients.forEach(client => console.log(`Client ID: ${client.id}, Type: ${typeof client.id}`));

    this.selectedClient = this.clients.find(client => client.id === numericClientId) || null;
    console.log('Selected Client:', this.selectedClient);
  }
}
