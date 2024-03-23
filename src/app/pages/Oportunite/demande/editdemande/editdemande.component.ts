import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DemandeService} from "../../../../Service/demande.service";
import {ToastrService} from "ngx-toastr";
import {EnvService} from "../../../../../env.service";
import {WsService} from "../../../../../ws.service";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Demande} from "../../../../Models/Demande";
import {Client} from "../../../../Models/Client";
import {ClientServiceService} from "../../../../Service/client-service.service";

@Component({
  selector: 'app-editdemande',
  templateUrl: './editdemande.component.html',
  styleUrls: ['./editdemande.component.scss']
})
export class EditdemandeComponent implements OnInit {
  demandeForm: FormGroup;
  statusList: string[] = [];
  id
    clients: Client[] = [];
  constructor(private fb: FormBuilder,private demandeService: DemandeService,private clientService:ClientServiceService,
              private toastr: ToastrService, private env: EnvService,   private wsService: WsService,
              private translateService: TranslateService, private router: Router, private route: ActivatedRoute,) {

    this.demandeForm = this.fb.group({
      id: null, // You might want to initialize other properties based on your requirements
      nom: ['', Validators.required],
      description: null,
      dateDeCreation: null,
      statutDemande: null,
      statut: [null, Validators.required],
      client: null,
    });
  }

  ngOnInit(): void {
      this.loadClients();
    this.demandeService.getStatusList().subscribe((statuses) => {
      this.statusList = statuses;
    });
// remplir les champs

      this.demandeService.getDemandeById(this.route.snapshot.params['id']).subscribe((result) => {
console.log(result)

            this.demandeForm.get('id').setValue(result['id']);
            this.demandeForm.get('nom').setValue(result['nom']);
            this.demandeForm.get('description').setValue(result['description']);
            this.demandeForm.get('statut').setValue(result['statut']);
            const dateDeCreation = result['dateDeCreation'] ? new Date(result['dateDeCreation']) : null;
            this.demandeForm.get('dateDeCreation').setValue(this.formatDate(dateDeCreation));
// this.demandeForm.get('client').setValue(result['client']);

              const clientId = result['client'] ? result['client']['id'] : (this.clients.length > 0 ? this.clients[0].id : null);
              this.demandeForm.get('client').setValue(clientId);
          }
      );

    }
  formatDate(date: Date): string {
    if (date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return null;
  }

  Return() {
    this.router.navigate(['Demande/user']);
  }
  onSubmit() {
    this.demandeForm.value.id = this.route.snapshot.params['id'];
    const demandeData: Demande = this.demandeForm.value as Demande;



    this.demandeService.updateDemande(this.route.snapshot.params['id'], demandeData)
        .subscribe((data: any) => {

          this.Return();

        }, error => {
          console.log("Handle error");
        });
  }

    getClientName(): string {
        const clientControl = this.demandeForm.get('client');
        if (clientControl && clientControl.value && clientControl.value.nom) {
            return clientControl.value.nom;
        } else {
            return 'xwxwx'; // or any default value you want to display
        }
    }

    loadClients() {
        this.clientService.getAllClientsWithoutPages().subscribe(
            (clients: Client[]) => {
                this.clients = clients;
            },
            (error) => {
                console.error('Error fetching clients: ', error);
            }
        );
    }
}
