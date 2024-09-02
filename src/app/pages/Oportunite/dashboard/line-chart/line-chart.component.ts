import { Component, OnInit } from '@angular/core';
import {DemandeService} from "../../../../Service/demande.service";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
    countriesInfo: any[] = [];
    opportuniteInfo: any[] = [];
    constructor(private service:DemandeService) { }

  ngOnInit(): void {
      this.service.getDataOppParDate().subscribe(
          (data: any) => {
              console.log('API Data:', data);

              this.countriesInfo = Object.keys(data).map(date => ({
                  date: new Date(date),
                  value: data[date]
              }));
          },
          error => {
              console.error('Error fetching API data:', error);
          }   );

  }

    onTypeChange(type: string) {
        // Handle type change if needed
        console.log('Selected Series Type:', type);
        // Implement logic to update chart based on type if required
    }

}
