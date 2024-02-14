import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/Models/Client';

@Component({
  selector: 'app-grid-demande',
  templateUrl: './grid-demande.component.html',
  styleUrls: ['./grid-demande.component.scss']
})
export class GridDemandeComponent implements OnInit {
  clients: Client[];
 
  constructor() { }

  ngOnInit(): void {
  }

}
