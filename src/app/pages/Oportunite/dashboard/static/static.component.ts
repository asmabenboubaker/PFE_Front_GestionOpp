import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OffreService} from "../../../../Service/offre.service";
import {DemandeService} from "../../../../Service/demande.service";
import {BcServiceService} from "../../../../Service/bc-service.service";

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss']
})
export class StaticComponent implements OnInit {
  monthlyOffreCounts: any[] = [];
  constructor(

    private http: HttpClient,private offreService: OffreService, private demandeService: DemandeService,private bCServiceService: BcServiceService
  ) { }

  customizeLabel = (pointInfo: any) => {
    return `Mois ${pointInfo.value}`;
  }

  customizeValueLabel = (pointInfo: any) => {
    return `${pointInfo.value} Offres`;
  }
  nbredemande: any;
  nbrebC: any;
  ngOnInit(): void {
    //set nbredemande to the number of bc
    this.bCServiceService.countBC().subscribe(data => {
      this.nbrebC = data;
      console.log("nbrebc", this.nbrebC);
      console.log("nbrebc", this.nbrebC);
    });
    //set nbredemande to the number of demandes
    this.demandeService.countDemande().subscribe(data => {
      this.nbredemande = data;
    });
    // pie chart
    this.fetchDemandsByDomain();
    this.offreService.getMonthlyOffreCounts().subscribe(data => {
      this.monthlyOffreCounts = data;
    });
  }
  // pie chart
  demandsByDomain: any[] = [];

  areas: any[];
  fetchDemandsByDomain() {
    this.http.get<any>('http://localhost:8888/demo_war/api/demandes/count2')
        .subscribe(data => {
          this.areas = Object.entries(data).map(([country, area]) => ({ country, area }));
          console.log("areas", this.areas);
        });
  }
  pointClickHandler(e) {
    this.toggleVisibility(e.target);
  }
  legendClickHandler(e) {
    const arg = e.target;
    const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

    this.toggleVisibility(item);
  }

  toggleVisibility(item) {
    if (item.isVisible()) {
      item.hide();
    } else {
      item.show();
    }
  }

}
