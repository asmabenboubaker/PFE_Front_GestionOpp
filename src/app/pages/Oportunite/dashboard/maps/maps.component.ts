import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {ClientServiceService} from "../../../../Service/client-service.service";
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  map: L.Map;
  colors: string[] = [
    'blue', 'green', 'orange', 'cyan', 'yellow', 'red', 'purple', 'pink', 'brown',
    'lime', 'magenta', 'olive', 'teal', 'navy', 'maroon', 'aqua', 'fuchsia', 'gray',
    'black', 'silver', 'gold', 'violet', 'indigo', 'turquoise', 'salmon', 'coral',
    'khaki', 'lavender', 'plum', 'orchid', 'tan', 'wheat', 'mint', 'peach', 'ivory',
    'beige', 'chocolate', 'crimson', 'firebrick', 'tomato', 'forestgreen', 'seagreen'
  ];

  constructor(private clientService: ClientServiceService) { }

  ngOnInit(): void {
    this.initMap();
    this.loadClients();
  }


  private initMap(): void {
    this.map = L.map('map', {
      center: [20, 0],
      zoom: 2
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  clients: any[] = [];
  private loadClients(): void {
    this.clientService.getAllClientsWithoutPages().subscribe(clients => {
      this.clients = clients;
      console.log("client",this.clients);
      this.addMarkers();
    });
  }
  private addMarkers(): void {
    this.clients.forEach(client => {
      if (client.adresse) {
        this.geocodeAddress(client);
      }
    });
  }

  private geocodeAddress(client: any): void {
    this.clientService.getCoordinates(client.adresse).subscribe(response => {
      if (response && response.length > 0) {
        const lat = response[0].lat;
        const lng = response[0].lon;
        const color = this.getRandomColor();
        L.circleMarker([lat, lng], {
          color: color,
          radius: 10
        }).addTo(this.map).bindPopup(client.nom);
      }
    });
  }

  private getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }


}
