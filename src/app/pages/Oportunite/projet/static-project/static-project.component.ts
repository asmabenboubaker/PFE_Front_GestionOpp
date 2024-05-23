import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { TaskFieldsModel } from '@syncfusion/ej2-angular-gantt';
import {ProjectService} from "../../../../Service/project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskServiceService} from "../../../../Service/task-service.service";
@Component({
  selector: 'app-static-project',
  templateUrl: './static-project.component.html',
  styleUrls: ['./static-project.component.scss']
})
export class StaticProjectComponent implements OnInit {
  // start pie chart

  areas: any[];
idprojet:any;
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
  // end pie chart


  //start gantt
  public data: any[] = [];
  public taskSettings: TaskFieldsModel | undefined;

  constructor(private http: HttpClient,private projetService : ProjectService,private router: Router,private taskService :TaskServiceService,
              public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idprojet=this.route.snapshot.paramMap.get('id');
    this.fetchDemandsByDomain();
    // gantt
    this.taskSettings = {id: 'id', name: 'subject', startDate: 'start_date', endDate: 'end_date', duration: 'Duration', progress: 'Progress', child: 'subtasks' };
    //set data methode form service

this.getProjets();
  }


  getProjets(): void {

    this.taskService.getTasks(this.idprojet).subscribe(projets => this.data = projets);}

}
