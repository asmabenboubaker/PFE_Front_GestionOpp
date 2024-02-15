import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/Models/Client';
import { ClientServiceService } from 'src/app/Service/client-service.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  newClient: Client = {
    id: 0,
    nom: '',
    adresse: '',
    telephone: '',
    email: '',
    description: '',
    dateInscription: '',
    typeClient: '',
    notes: ''
  };
  constructor(private clientService: ClientServiceService) { }
  onFieldDataChanged(e: any) {
    // Handle field data changes if needed
  }
  ngOnInit(): void {
  }
  addClient() {
    this.clientService.addClient(this.newClient).subscribe(
      (addedClient) => {
        console.log('Client added successfully:', addedClient);
        // You can perform any additional actions after adding the client here
      },
      (error) => {
        console.error('Error adding client:', error);
        // Handle error here
      }
    );
  }
}
