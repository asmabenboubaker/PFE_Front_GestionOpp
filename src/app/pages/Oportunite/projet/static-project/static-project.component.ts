import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-static-project',
  templateUrl: './static-project.component.html',
  styleUrls: ['./static-project.component.scss']
})
export class StaticProjectComponent implements OnInit {
  // start pie chart

  areas: any[];

  fetchDemandsByDomain() {
    this.http.get<any>('http://localhost:8888/demo_war/api/tasks/1/task-status-statistics')
        .subscribe(data => {
          // Assuming data is in the format [{ status: 'a faire', count: 1 }, { status: 'en cours', count: 2 }, ... ]
          this.areas = data.map(entry => ({ country: entry.status, area: entry.count }));
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

  constructor(    private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchDemandsByDomain();
  }

}
