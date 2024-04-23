import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {OpportuniteService} from "../../../../Service/opportunite.service";
import {ClientServiceService} from "../../../../Service/client-service.service";
import {ToastrService} from "ngx-toastr";
import {EnvService} from "../../../../../env.service";
import {WsService} from "../../../../../ws.service";
import {TranslateService} from "@ngx-translate/core";
import {TokenStorageService} from "../../../Global/shared-service/token-storage.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {ProjectService} from "../../../../Service/project.service";

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {





  oppForm: any;
  oppid: any;
  decissionWF: any;
  projetF = this.fb.group({
    id: [''], // Assurez-vous d'ajouter tous les champs de votre formulaire
    nom: [''],
    responsable: [''],
    participants: [''],
    objectif: [''],
    lieu: [''],
    type: [''],
    commentaires: [''],
    priorite: [''],
    budget: [''],
    description: [''],
    // Ajoutez le champ pour la décision de création dans Jira
    JiraProject: ['']
  });
  constructor(
      private fb: FormBuilder,
      private toastr: ToastrService, private env: EnvService, private wsService: WsService,
      private translateService: TranslateService,
      private tokenStorage: TokenStorageService,
      private http: HttpClient,
      private router: Router,
      public route: ActivatedRoute,
      private datePipe: DatePipe,
      private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.oppid = this.route.snapshot.paramMap.get('id');
    this.projectService.getCSRFTokenFromCookies();
  }
  onSubmit(): void {

    const decision = this.projetF.get('JiraProject').value;
    console.log('Décision de création du projet dans Jira :', decision);
    if (decision === 'oui') {
      this.createProjectInJira();
    } else {
        console.log('Création du projet dans Jira annulée');
    }
  }
  private createProjectInJira(): void {
    // Récupérez les données du projet à partir du formulaire
    const formData = this.projetF.value;
    const key = this.generateProjectKey(formData.nom);
    const projectData = {
      key: key.toUpperCase(),
      name: formData.nom,
      projectTypeKey: "business",
      projectTemplateKey: "com.atlassian.jira-core-project-templates:jira-core-project-management",
      description: formData.description,
      lead: "asmaboubaker",
      url: "http://atlassian.com",
      assigneeType: "PROJECT_LEAD",
      avatarId: 10200,
      issueSecurityScheme: 10001,
      permissionScheme: 10011,
      notificationScheme: 10021,
      categoryId: 10120

    };

    // Appelez la méthode du service pour créer le projet dans Jira
    this.projectService.createProject(projectData).subscribe(
        (response) => {

          console.log('Projet créé avec succès dans Jira :', response);
        },
        (error) => {

          console.error('Erreur lors de la création du projet dans Jira :', error);
        }
    );
  }
  private generateProjectKey(name: string): string {

    const words = name.split(' ');

    const key = words.map(word => word.charAt(0)).join('');

    return key;
  }
}
