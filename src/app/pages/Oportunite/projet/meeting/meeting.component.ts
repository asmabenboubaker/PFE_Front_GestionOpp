import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../../../../Service/project.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {
  projets: any[] = [];
  constructor(private projetService : ProjectService,private router: Router) { }

  ngOnInit(): void {
    this.getProjets();
  }
  getProjets(): void {
    this.projetService.getprojets().subscribe(projets => this.projets = projets); // Utilisez le service pour récupérer la liste des projets
  }
  // methode for go to page task board
  navigateToTaskBoard(): void {
    this.router.navigate(['projet/tasks']);
  }

}
