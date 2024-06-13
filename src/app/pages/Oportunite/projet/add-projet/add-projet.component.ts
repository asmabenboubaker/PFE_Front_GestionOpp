import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../../../Service/project.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-projet',
  templateUrl: './add-projet.component.html',
  styleUrls: ['./add-projet.component.scss']
})
export class AddProjetComponent implements OnInit {
  addProjetForm: FormGroup;
  constructor(  private fb: FormBuilder,
                private projetService: ProjectService,
                private router: Router,
                private toastr: ToastrService
                ,
                private translateService: TranslateService ) { }

  ngOnInit(): void {
    this.addProjetForm = this.fb.group({
      nom: ['', Validators.required],
      responsable: ['', Validators.required],
      participants: [''],
      objectif: ['', Validators.required],
      lieu: [''],
      type: ['', Validators.required],
      commentaires: [''],
      lienJira: ['', Validators.required],
      idJira: [''],
      priorite: [0, Validators.required],
      budget: [0, Validators.required],
      description: [''],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
        JiraProject: ['']
    });
  }
  onSubmit() {


    this.projetService.addProject(this.addProjetForm.value).subscribe(
        data => {

            const decision = this.addProjetForm.get('JiraProject').value;
            console.log('Décision de création du projet dans Jira :', decision);
            if (decision === 'oui') {
                this.createProjectInJira();
                this.translateService.get("project Created").subscribe(
                    res => {
                        this.toastr.success(res, "", {
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
          this.router.navigate(['/projet/allproject']);
        },
        error => {
          this.translateService.get("projectCreationFailed").subscribe(
              res => {
                this.toastr.error(res, "", {
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
    );
  }

    private createProjectInJira(): void {
        // Récupérez les données du projet à partir du formulaire
        const formData = this.addProjetForm.value;
        const key = this.generateProjectKey(formData.nom);
        this.addProjetForm.get('lienJira').setValue(key.toUpperCase());
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
        this.projetService.createProject(projectData).subscribe(
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
