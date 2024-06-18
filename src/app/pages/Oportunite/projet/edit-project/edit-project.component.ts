import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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

  editProjetForm: FormGroup;
  projectId: number;



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
  private initForm(): void {
    this.editProjetForm = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
      responsable: ['', Validators.required],
      participants: [''],
      objectif: [''],
      lieu: [''],
      type: ['', Validators.required],
      commentaires: [''],
      lienJira: ['', Validators.required],
      idJira: [''],
      priorite: [0, Validators.required],
      budget: [0],
      description: [''],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      JiraProject: ['']
    });
  }
  ngOnInit(): void {
    this.oppid = this.route.snapshot.paramMap.get('id');
    this.projectService.getCSRFTokenFromCookies();
    this.projectId = +this.route.snapshot.paramMap.get('id');
    this.initForm();

    // Load existing project data
    this.projectService.getProjectById(this.projectId).subscribe(
        data => {
          this.editProjetForm.patchValue(data);
        },
        error => {
          this.toastr.error('Error loading project data', '', {
            closeButton: true,
            positionClass: 'toast-top-right',
            extendedTimeOut: 5000,
            progressBar: true,
            disableTimeOut: false,
            timeOut: 5000,
          });
        }
    );
  }
  // onSubmit(): void {
  //
  //   const decision = this.projetF.get('JiraProject').value;
  //   console.log('Décision de création du projet dans Jira :', decision);
  //   if (decision === 'oui') {
  //     this.createProjectInJira();
  //   } else {
  //       console.log('Création du projet dans Jira annulée');
  //   }
  // }
  private createProjectInJira(): void {
    // Récupérez les données du projet à partir du formulaire
    const formData = this.projetF.value;
    const key = this.generateProjectKey(formData.nom);
    const projectData = {
      key: key.toUpperCase(),
      name: formData.nom,
      projectTypeKey: 'business',
      projectTemplateKey: 'com.atlassian.jira-core-project-templates:jira-core-simplified-process-control',
      description: formData.description,
      leadAccountId: '712020:c4a36858-f637-4956-aaee-450a47fd5bf7',
      assigneeType: 'PROJECT_LEAD',
      url: 'http://atlassian.com'
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

  onSubmit(): void {
    if (this.editProjetForm.invalid) {
      this.toastr.error('Please fill in all required fields', '', {
        closeButton: true,
        positionClass: 'toast-top-right',
        extendedTimeOut: 5000,
        progressBar: true,
        disableTimeOut: false,
        timeOut: 5000,
      });
      return;
    }
// set id
    this.editProjetForm.patchValue({id: this.projectId});
    this.projectService.updateProject(this.projectId, this.editProjetForm.value).subscribe(
        data => {
          this.toastr.success('Project updated successfully', '', {
            closeButton: true,
            positionClass: 'toast-top-right',
            extendedTimeOut: 5000,
            progressBar: true,
            disableTimeOut: false,
            timeOut: 5000,
          });
          this.router.navigate(['/projet/allproject']);
        },
        error => {
          this.toastr.error('Project update failed', '', {
            closeButton: true,
            positionClass: 'toast-top-right',
            extendedTimeOut: 5000,
            progressBar: true,
            disableTimeOut: false,
            timeOut: 5000,
          });
        }
    );
  }
  //tooolbar
  backButtonOptions = {
    icon: 'back',
    onClick: () => {
      this.router.navigate(['/projet/allproject']);
    }
  }



  statisticsButtonOptions = {
    icon: 'chart',
    text: 'Statistiques',
    onClick: () => {
      this.router.navigate(['/projet/static/' + this.projectId]);
    }
  }

  taskManagerButtonOptions = {
    icon: 'todo',
    text: 'les tâches',
    onClick: () => {
      this.router.navigate(['/projet/tasks/' + this.projectId]);
    }
  }
}
