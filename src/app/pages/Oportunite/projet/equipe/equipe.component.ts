import { Component, OnInit } from '@angular/core';
import {EquipeServiceService} from "../../../../Service/equipe-service.service";

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss']
})
export class EquipeComponent implements OnInit {
equipeq:any[]=[];
  constructor(private equipeService:EquipeServiceService) { }

  ngOnInit(): void {
 this.getEquipe();
  }
  //get list equipe
    getEquipe(): void {
        this.equipeService.getEquipes().subscribe(equipeq => this.equipeq = equipeq);
    }

}
