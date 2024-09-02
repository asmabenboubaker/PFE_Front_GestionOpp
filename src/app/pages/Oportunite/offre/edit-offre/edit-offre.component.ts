import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Client} from "../../../../Models/Client";
import {OpportuniteService} from "../../../../Service/opportunite.service";
import {OffreService} from "../../../../Service/offre.service";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {DemandeService} from "../../../../Service/demande.service";
import {ClientServiceService} from "../../../../Service/client-service.service";
import {ToastrService} from "ngx-toastr";
import {EnvService} from "../../../../../env.service";
import {WsService} from "../../../../../ws.service";
import {TranslateService} from "@ngx-translate/core";
import {TokenStorageService} from "../../../Global/shared-service/token-storage.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {BcServiceService} from "../../../../Service/bc-service.service";
import {CookieService} from "ngx-cookie-service";
import {WebSocketService} from "../../../../Service/web-socket.service";
import {DxDataGridComponent} from "devextreme-angular";
import {Tab, initMDB} from "mdb-ui-kit";

@Component({
    selector: 'app-edit-offre',
    templateUrl: './edit-offre.component.html',
    styleUrls: ['./edit-offre.component.scss']
})
export class EditOffreComponent implements OnInit {
    opps: any[] = [];
    oppid: any;
    offreForm: any;
    decissionWF: any;
    objectData: any;
    creationOffre: boolean = false;
    validation: boolean = false;
    reponse: boolean = false;
    elsebool: boolean = false;
    taskForm: FormGroup;
    article: any[] = [];

   offreF: any;
    showModal: boolean = false;
    @ViewChild('gridContainer', {static: false}) gridContainer: DxDataGridComponent;

    constructor(private offreService: OffreService, private fb: FormBuilder, private demandeService: DemandeService, private clientService: ClientServiceService,
                private toastr: ToastrService, private env: EnvService, private wsService: WsService,
                private translateService: TranslateService,
                private tokenStorage: TokenStorageService,
                private http: HttpClient,
                private router: Router,
                public route: ActivatedRoute,
                private datePipe: DatePipe,
                private bcService: BcServiceService,
                private cookieService: CookieService,
                private webSocketService: WebSocketService
    ) {
        this.offreF = this.fb.group(
            {
                "className": null,
                "classId": null,
                "simpleClassName": null,
                "labelClass": null,
                "attachements": [],
                "events": null,
                "userActivity": [],
                "userPermission": null,
                "currentState": null,
                "formSource": null,
                "workflow": null,
                "remaingRequestFileDefinitions": null,
                "security": null,
                "components": null,
                "officeTemplateFileName": null,
                "emailTemplateFileName": null,
                "readFormNameFM": null,
                "editFormNameFM": null,
                "readFormName": null,
                "editFormName": null,
                "wfProcessName": null,
                "id": null,
                "articles": [],
                "montant": null,
                "dateOffre": null,
                "description": null,
                "valideJusquA": null,
                "opportunite": null,
                "decision": null,
                "activityName": null,
                "endProcess": false,
                "wfProcessID": null,
                "assignee": null,
                "status": null,
                "fileAccessToken": null,
                "securiteLevel": null,
                "draft": null,
                "wfCurrentComment": null,
                "modePaiement": null,
                "dateLivraison": null,
                "statutOffre": null,
                "mandatoryTemplateFileName": null,
                "optionalTemplateFileName": null,
                "defaultTemplateFileName": null
            });

        this.offreForm = this.fb.group(
            {
                "className": null,
                "classId": null,
                "simpleClassName": null,
                "labelClass": null,
                "attachements": [],
                "events": null,
                "userActivity": [],
                "userPermission": null,
                "currentState": null,
                "formSource": null,
                "workflow": null,
                "remaingRequestFileDefinitions": null,
                "security": null,
                "components": null,
                "officeTemplateFileName": null,
                "emailTemplateFileName": null,
                "readFormNameFM": null,
                "editFormNameFM": null,
                "readFormName": null,
                "editFormName": null,
                "wfProcessName": null,
                "id": null,
                "articles": [],
                "montant": null,
                "dateOffre": null,
                "description": null,
                "valideJusquA": null,
                "opportunite": null,
                "decision": null,
                "activityName": null,
                "endProcess": false,
                "wfProcessID": null,
                "assignee": null,
                "status": null,
                "fileAccessToken": null,
                "securiteLevel": null,
                "draft": null,
                "wfCurrentComment": null,
                "modePaiement": null,
                "dateLivraison": null,
                "statutOffre": null,
                "mandatoryTemplateFileName": null,
                "optionalTemplateFileName": null,
                "defaultTemplateFileName": null
            });

        this.taskForm = this.fb.group({
            nom: ['', Validators.required],
            description: ['', Validators.required],
            quantite: ['', Validators.required],
            prixUnitaire: ['', Validators.required],
        });

    }

    oppObject: any;
    tasks: any[] = [];

    ngOnInit(): void {

        initMDB({Tab});
        this.loadopps()
        this.oppid = this.route.snapshot.paramMap.get('id');
        this.offreService.getOffreByidd(this.oppid).toPromise().then(
            data => {
                this.oppObject = data;
                console.log("oppObject", this.oppObject)
            }
        );
        this.offreService.getOffreByid(this.oppid).toPromise().then(
            data => {
                this.objectData = data
                this.offreF.get('id').setValue(data.id);
                this.offreF.get('modePaiement').setValue(data.modePaiement);
                this.offreF.get('montant').setValue(data.montant);
                this.offreF.get('dateLivraison').setValue(data.dateLivraison);
                this.offreF.get('description').setValue(data.description);


                this.offreF.get('className').setValue(data.className);
                this.offreF.get('classId').setValue(data.classId);
                this.offreF.get('simpleClassName').setValue(data.simpleClassName);

                this.offreF.get('labelClass').setValue(data.labelClass);
                this.offreF.get('attachements').setValue(data.attachements);
                this.offreF.get('events').setValue(data.events);
                this.offreF.get('userActivity').setValue(data.userActivity);
                this.offreF.get('userPermission').setValue(data.userPermission);
                this.offreF.get('currentState').setValue(data.currentState);
                this.offreF.get('formSource').setValue(data.formSource);
                this.offreF.get('workflow').setValue(data.workflow);
                this.offreF.get('remaingRequestFileDefinitions').setValue(data.remaingRequestFileDefinitions);
                this.offreF.get('security').setValue(data.security);
                this.offreF.get('components').setValue(data.components);
                this.offreF.get('officeTemplateFileName').setValue(data.officeTemplateFileName);
                this.offreF.get('emailTemplateFileName').setValue(data.emailTemplateFileName);
                this.offreF.get('readFormNameFM').setValue(data.readFormNameFM);
                this.offreF.get('editFormNameFM').setValue(data.editFormNameFM);
                this.offreF.get('readFormName').setValue(data.readFormName);
                this.offreF.get('editFormName').setValue(data.editFormName);
                this.offreF.get('wfProcessName').setValue(data.wfProcessName);
                this.offreF.get('articles').setValue(data.articles);
                this.offreF.get('montant').setValue(data.montant);
                this.offreF.get('dateOffre').setValue(data.dateOffre);
                this.offreF.get('description').setValue(data.description);
                this.offreF.get('valideJusquA').setValue(data.valideJusquA);
                this.offreF.get('opportunite').setValue(data.opportunite);
                this.offreF.get('decision').setValue(data.decision);
                this.offreF.get('activityName').setValue(data.activityName);
                this.offreF.get('endProcess').setValue(data.endProcess);
                this.offreF.get('wfProcessID').setValue(data.wfProcessID);
                this.offreF.get('assignee').setValue(data.assignee);
                this.offreF.get('status').setValue(data.status);
                this.offreF.get('fileAccessToken').setValue(data.fileAccessToken);
                this.offreF.get('securiteLevel').setValue(data.securiteLevel);
                this.offreF.get('draft').setValue(data.draft);
                this.offreF.get('wfCurrentComment').setValue(data.wfCurrentComment);
                this.offreF.get('modePaiement').setValue(data.modePaiement);
                this.offreF.get('dateLivraison').setValue(data.dateLivraison);
                this.offreF.get('statutOffre').setValue(data.statutOffre);
                this.offreF.get('mandatoryTemplateFileName').setValue(data.mandatoryTemplateFileName);
                this.offreF.get('optionalTemplateFileName').setValue(data.optionalTemplateFileName);
                this.offreF.get('defaultTemplateFileName').setValue(data.defaultTemplateFileName);




                console.log("Fetched Successfully :", data);
                // Vérifiez si data.workflow est défini avant d'accéder à decisionsWF
                this.decissionWF = data.workflow && data.workflow.decisionsWF ? data.workflow.decisionsWF : null;

                //const decisionsWF = data.workflow.decisionsWF
                console.log("DECICIONS WK ::: " + this.decissionWF);


                //get decissionWF
                this.decissionWF = data['workflow']['decisionsWF'];
                console.log("fdfdf" + data['workflow']['decisionsWF'])
                if (data.workflow.decisionsWF == "Validation\n") {

                    this.creationOffre = true;
                }
//['Accepter\n', 'Rejeter\n']
                else if (this.decissionWF[0] == "Rejeter\n" || this.decissionWF[1] == "Accepter") {
                    this.validation = true;
                }
                //['Abandonner', 'Continuer']
                else if (this.decissionWF[0] == "Continuer" || this.decissionWF[1] == "Abandonner") {
                    this.reponse = true;
                } else {
                    this.elsebool = true;
                    console.log("this.oppObject.createbc==false" + this.oppObject.createBC)
                    console.log("this.cookieService.get('profiles').includes(this.env.depositOpportunite)" + this.cookieService.get('profiles').includes(this.env.depositOpportunite))
                    console.log(this.objectData.activityName == "fin")
                    if (this.oppObject.createBC == false && this.cookieService.get('profiles').includes(this.env.depositOpportunite) && this.objectData.activityName == "fin") {
                        this.showModal = true;
                    }
                }

            },
            error => {
                console.log("Error :", error);
            }
        );

        this.getAllArticles();

    }

    loadopps() {
        this.offreService.getAllOppWithoutPages().subscribe(
            (clients: Client[]) => {
                console.log('opp: ', clients);
                this.opps = clients;
            },
            (error) => {
                console.error('Error fetching opp: ', error);
            }
        );
    }

    Confirmation(evt) {
        this.loadingVisible = true;
        const formData = this.offreF.value;


        formData['decision'] = evt.decision.trim();
        formData['wfCurrentComment'] = evt.wfCurrentComment;
        console.log("this.demanade CONFIRMATION", formData)

        this.offreService.Offre_process_Submit(formData).subscribe(data => {
            this.toastr.success(" added successfully" +
                "", "", {
                closeButton: true,
                positionClass: 'toast-top-right',
                extendedTimeOut: this.env.extendedTimeOutToastr,
                progressBar: true,
                disableTimeOut: false,
                timeOut: this.env.timeOutToastr
            })
            this.loadingVisible = true;
            //return to list
            this.router.navigate(['offre/all']);
            //redirect to demande list
            //   this.router.navigate(['offre/edit/'+this.oppid]);
            if (evt.decision.trim() == "Validation") {
                this.sendNotification(this.oppid);
            }
        }, error => {
            this.toastr.error("failed to add ", "", {
                closeButton: true,
                positionClass: 'toast-top-right',
                extendedTimeOut: this.env.extendedTimeOutToastr,
                progressBar: true,
                disableTimeOut: false,
                timeOut: this.env.timeOutToastr
            })
            console.log("error", error)
        })

    }

    @ViewChild('OppSelect') OppSelect: ElementRef;

    save() {
        // Récupérer les valeurs du FormGroup
        const formData = this.offreF.value;

        //ajouter decision to formData
        formData['decision'] = "Pour Validation";
        const selectedOppId = this.OppSelect?.nativeElement.value;
        // this.offreDTO['client'] = selectedOppId;
        console.log('Client Select Element:', this.OppSelect);
        console.log('Client Select Value:', this.OppSelect?.nativeElement.value);
        console.log("data save", formData)
        this.offreService.updateAndAssignToOpp(selectedOppId, this.oppid, formData).subscribe(data => {
                this.toastr.success("added successfully" +
                    "", "", {
                    closeButton: true,
                    positionClass: 'toast-top-right',
                    extendedTimeOut: this.env.extendedTimeOutToastr,
                    progressBar: true,
                    disableTimeOut: false,
                    timeOut: this.env.timeOutToastr
                })
//redirect to demande list
                this.router.navigate(['offre/all']);

            },
            error => {
                this.toastr.error("Failed to add", "", {
                    closeButton: true,
                    positionClass: 'toast-top-right',
                    extendedTimeOut: this.env.extendedTimeOutToastr,
                    progressBar: true,
                    disableTimeOut: false,
                    timeOut: this.env.timeOutToastr
                })
                console.log("error", error)
            })
    }


    downloadPdfOnClick() {
        const formData = this.offreF.value;
        const client = this.objectData?.opportunite?.demande?.client;
        this.offreService.generatePdf(formData, this.tasks, client);
    }

    Retourn() {

    }

    affecterOpportuniteAOffre(oppid, offreId): void {
        this.offreService.affecterOffreaBc(oppid, offreId)
            .subscribe(response => {
                console.log('Opportunite affectée à la demande avec succès:', response);

            }, error => {
                console.error('Erreur lors de l\'affectation de l\'opportunité à la demande:', error);

            });
    }

    onCancelClick(): void {
        this.showModal = false;
    }

    onCreateOpportunityClick(): void {

        this.offreService.setCreateBCTrue(this.oppid).subscribe(data => {
            console.log("set create opp true", data)

        });
        this.bcService.InitBC().subscribe(data => {
            const oppId = data['id'];
            this.affecterOpportuniteAOffre(oppId, this.oppid);
            this.router.navigate(['bondecommande/add/' + oppId], {queryParams: {demandeId: this.oppid}});

            this.showModal = false;
        });
    }


    popupViewerVisible: any = false;

    showPopupWF() {
        this.popupViewerVisible = true;
    }

    popupHeight = window.innerHeight - 50;
    popupWidth = window.innerWidth - window.innerWidth / 3;


// Notification
    username: any;

    sendNotification(demandeId: number) {

        const message = 'Nouvelle offre pour validation';
        const url = `/offre/edit/${demandeId}`;
        this.username = this.cookieService.get('displayname');
        const createdBy = this.username;
        const username = "oppDG";
        this.webSocketService.sendNotification({message, url, createdBy, username});
    }

    // load data
    loadingVisible = false;

    onShown() {
        setTimeout(() => {
            this.loadingVisible = false;
        }, 3000);
    }

    onHidden() {
        //this.employeeInfo = this.employee;
    }

    // data grid article
    onToolbarPreparing(e) {


        e.toolbarOptions.items.unshift(
            {
                location: 'after',
                template: 'ExportPDF'
            });
        e.toolbarOptions.items.unshift(
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    hint: 'Reset',
                    icon: 'undo',
                    onClick: this.resetGrid.bind(this),
                }
            });
        e.toolbarOptions.items.unshift(
            {
                location: 'after',
                widget: 'dxButton',
                options: {
                    hint: 'Refresh',
                    icon: 'refresh',
                    onClick: this.refresh.bind(this),
                }
            });
        e.toolbarOptions.items.unshift({
            location: 'after',
            widget: 'dxButton',
            options: {
                hint: 'Nouveau',
                icon: 'plus',
                onClick: this.openPopup.bind(this),
            },
        });
        e.toolbarOptions.items.unshift(
            {
                location: 'center',
                template: 'Liste Articles'
            }
        );


    }

    refresh() {

    }

    resetGrid() {

    }

    popupVisible = false;

    openPopup() {
        this.popupVisible = true;
    }

    getAllArticles() {
        //set articles
        this.offreService.getArticlesByOffreId(this.oppid)
            .subscribe(
                (articles: any[]) => {
                    this.tasks = articles;
                    console.log('Articles:', articles);
                    // Handle success
                },
                error => {
                    console.error('Error retrieving articles:', error);
                    // Handle error
                }
            );
        // this.offreService.getAllArticles()
        //     .subscribe(
        //         (articles: any[]) => {
        //             this.tasks = articles;
        //             console.log('Articles:', articles);
        //             // Handle success
        //         },
        //         error => {
        //             console.error('Error retrieving articles:', error);
        //             // Handle error
        //         }
        //     );
    }

//     addTask(){
// const formData = this.taskForm.value;
//         console.log('formData:', formData);
//         this.offreService.createArticleAndAssignToOffreDePrix(this.oppid, formData)
//             .subscribe(
//                 response => {
//                     console.log('Article added successfully:', response);
//                     // Handle success
//                     this.getAllArticles();
//                     this.taskForm.reset();
//                     this.popupVisible = false;
//                 },
//                 error => {
//                     console.error('Error adding article:', error);
//                     // Handle error
//                 }
//             );
//
//     }

    addTask() {

        if (this.taskForm.valid) {
            const taskData = this.taskForm.value;
            if (this.isEditMode) {
                taskData.id = this.selectedTask.id;
                console.log('Updating task id :', taskData.id);
                this.offreService.updateArticle(taskData.id, taskData).subscribe(
                    (response) => {
                        this.getAllArticles();
                        this.popupVisible = false;
                        this.taskForm.reset();
                    },
                    (error) => {
                        console.error('Error updating task:', error);
                    }
                );
            } else {
                this.offreService.createArticleAndAssignToOffreDePrix(this.oppid, taskData).subscribe(
                    (response) => {
                        this.getAllArticles();
                        this.popupVisible = false;
                        this.taskForm.reset();
                    },
                    (error) => {
                        console.error('Error adding task:', error);
                    }
                );
            }
        }
    }

    closePopup() {
        this.popupVisible = false;
    }

    deleteArticle(taskId: number) {
        this.offreService.deleteArticle(taskId).subscribe(
            () => {
                this.getAllArticles();
                this.popupVisible = false;
            },
            (error) => {
                console.error('Error deleting task:', error);
            }
        );
    }

    selectedTask: any;
    isEditMode: boolean = false;

    editTask(task: any) {
        this.isEditMode = true;
        this.selectedTask = task;
        console.log('Editing task:', task); // Debug: Log the task to be edited
        this.taskForm.patchValue(task);
        this.popupVisible = true;
    }

    // toolbar :
    backButtonOptions = {
        icon: 'back',
        onClick: () => {
            this.router.navigate(['/offre/all']);
        }
    };
    addButtonOptions = {
        icon: 'fa fa-download',

        onClick: () => {
            this.downloadPdfOnClick();
        }
    };

    GetjsonDowViewerFromAttatchement($event: any) {

    }

    getInstructionById(id) {

    }
}
