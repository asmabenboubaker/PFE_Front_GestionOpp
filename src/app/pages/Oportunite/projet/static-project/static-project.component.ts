import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ProjectService } from "../../../../Service/project.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskServiceService } from "../../../../Service/task-service.service";
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhPYVFxWmFZfVpgfV9GZlZVTGYuP1ZhSXxXdkBhUX9XcHJRT2leUEM=');

@Component({
  selector: 'app-static-project',
  templateUrl: './static-project.component.html',
  styleUrls: ['./static-project.component.scss']
})
export class StaticProjectComponent implements OnInit {
  areas: any[] = [];
  idprojet: any;
  tasks: any[] = [];
    data: any;

  constructor(
      private http: HttpClient,
      private projetService: ProjectService,
      private router: Router,
      private taskService: TaskServiceService,
      public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idprojet = this.route.snapshot.paramMap.get('id');
    this.fetchDemandsByDomain();
    this.getProjets();
  }

  fetchDemandsByDomain() {
    this.http.get<any>('http://localhost:8888/demo_war/api/tasks/1/task-status-statistics')
        .subscribe(data => {
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

  getProjets(): void {
    this.taskService.getTasks(this.idprojet).subscribe(projets => {
      this.data = projets;
      this.transformData();
    });
  }

  transformData() {
    this.tasks = this.data.map(item => ({
      id: item.id,
      title: item.subject,
      start: new Date(item.start_date),
      end: new Date(item.end_date),
    }));
    console.log('Transformed tasks:', this.tasks);
  }
}
