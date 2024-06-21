import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  map: L.Map;

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Initialiser la carte
    this.map = L.map('map', {
      center: [20, 0],
      zoom: 2
    });

    // Ajouter une couche de tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Ajouter des marqueurs pour les pays
    const clients = [
      { "name": "United States", "lat": 37.0902, "lng": -95.7129, "color": "blue" },
      { "name": "Australia", "lat": -25.2744, "lng": 133.7751, "color": "green" },
      { "name": "India", "lat": 20.5937, "lng": 78.9629, "color": "orange" },
      { "name": "Saudi Arabia", "lat": 23.8859, "lng": 45.0792, "color": "cyan" },
      { "name": "Germany", "lat": 51.1657, "lng": 10.4515, "color": "yellow" }
    ];

    clients.forEach(client => {
      L.circleMarker([client.lat, client.lng], {
        color: client.color,
        radius: 10
      }).addTo(this.map).bindPopup(client.name);
    });
  }

}
