import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/Models/Client';

@Component({
  selector: 'app-grid-client',
  templateUrl: './grid-client.component.html',
  styleUrls: ['./grid-client.component.scss']
})
export class GridClientComponent implements OnInit {
  clients: Client[];
 
  constructor() { 
    
  }

  ngOnInit(): void {
    this.clients = [
      {
        id: 1,
        adresse: '123 Main St',
        telephone: '555-1234',
        email: 'client1@example.com',
        nom: 'Client 1',
        description: 'Some description',
        dateInscription: '2024-02-14',
        typeClient: 'Regular',
        notes: 'Some notes'
      },
      {
        id: 2,
        adresse: '456 Oak St',
        telephone: '555-5678',
        email: 'client2@example.com',
        nom: 'Client 2',
        description: 'Another description',
        dateInscription: '2024-02-14',
        typeClient: 'VIP',
        notes: 'Additional notes'
      }
      
    ];
  
  }

}
