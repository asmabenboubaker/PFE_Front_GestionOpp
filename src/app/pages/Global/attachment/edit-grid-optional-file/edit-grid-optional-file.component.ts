import {Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent} from "devextreme-angular";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {loadMessages, locale} from "devextreme/localization";
import frMessages from "devextreme/localization/messages/fr.json";
import arMessages from "devextreme/localization/messages/ar.json";
import {Observable} from "rxjs/internal/Observable";
import {ReplaySubject} from "rxjs";

import {CookieService} from "ngx-cookie-service";
import { HttpServicesComponent } from '../../ps-tools/http-services/http-services.component';
import {CommunFuncService} from "../Commun/commun-func.service";
import {AttachementModuleService} from "../attachement.module.service";
import {HttpParamMethodDelete, HttpParamMethodPost} from "../../ps-tools/class";
import {EnvService} from "../../../../../env.service";


@Component({
  selector: 'app-edit-grid-optional-file',
  templateUrl: './edit-grid-optional-file.component.html',
  styleUrls: ['./edit-grid-optional-file.component.scss']
})
export class EditGridOptionalFileComponent implements OnInit {
  loadingVisible: boolean = false;
  @ViewChild(HttpServicesComponent, {static: true}) private httpServicesComponent: HttpServicesComponent;

  currentLanguage: string = 'ar';

  @Input() document: any;

  @Input() optionalFileDefinitions: any[] = [];

  originalOptionalFileDefinitions: any[] = [];

  mandatoryFileDefinitions: any[] = [];

  otherDocuments: any[] = [];

  objectFile: any;

  @ViewChild(DxDataGridComponent, {static: false}) dataGridOtherDocuments: DxDataGridComponent;

  private modalService = inject(NgbModal);

  pstkEnabledAndRunning: any = this.cookieService.get('envPstkRunning') === 'true'
  PstkEnabled: any = this.cookieService.get('PstkEnabled') === 'true'

  authorizationTokenScan: any = true;
  ModuleScan = require('src/app/pages/Global/attachment/ModulePSTK.json').Module_Scan
  ModuleOffice = require('src/app/pages/Global/attachment/ModulePSTK.json').Module_Office;
  ModuleSign = require('src/app/pages/Global/attachment/ModulePSTK.json').Module_Sign;
  ModuleMisc = require('src/app/pages/Global/attachment/ModulePSTK.json').Module_Misc;
  fileAccessToken = ""

  constructor(public communService: CommunFuncService, private fileservice: AttachementModuleService, private cookieService: CookieService, private toastr: ToastrService, private toastrService: ToastrService, private translateService: TranslateService, public env: EnvService) {

    this.currentLanguage = this.translateService.currentLang

    if (localStorage.getItem("locale")) {
      translateService.use(localStorage.getItem("locale"));
      locale(localStorage.getItem("locale"));
      this.currentLanguage = localStorage.getItem("locale");
    } else {
      translateService.use("ar");
      locale("ar");
      this.currentLanguage = "ar";
    }
    if (this.currentLanguage === "fr")
      loadMessages(frMessages);
    else if (this.currentLanguage === "ar")
      loadMessages(arMessages);

  }


  ngOnInit(): void {


    this.originalOptionalFileDefinitions = this.optionalFileDefinitions;

    // this.getRequestFileDefinitions()
    this.getdatasource()

  }

  getdatasource() {
    this.otherDocuments = []
    this.optionalFileDefinitions=this.originalOptionalFileDefinitions

    this.fileservice.getfilesByClassIdAndObjectId(this.document.classId, this.document.id, '').subscribe((data: any) => {
      if (data.length !== 0) {
        // data.forEach(file => {
        //   const reQFiles = this.optionalFileDefinitions.find(elem => elem.id === file.requestFileDefinition.id);
        //   // const reQFiles = this.datsourcesFiles.find(elem => elem.name === file.docTitle);
        //   if (reQFiles && reQFiles['attachement']) {
        //     console.log('tof::> ',typeof reQFiles['attachement'])
        //      reQFiles['attachement'].push(file); // Assuming `file` is the attachment data you want to set
        //
        //   }
        // });

        // Fonction pour filtrer les éléments de la datasource
        this.otherDocuments = data.filter(item => {
          return this.originalOptionalFileDefinitions.some(criterion => {
            return item.requestFileDefinition.id === criterion.id
          });
        });

        // Identifier les IDs des éléments à supprimer
        const idsToRemove = data.filter(item => {
          return this.originalOptionalFileDefinitions.some(criterion => {
            return item.requestFileDefinition.id === criterion.id && criterion.labelEditable === false;
          });
        }).map(item => item.requestFileDefinition.id);

// Supprimer les éléments de this.optionalFileDefinitions dont labelEditable est false et qui figurent dans data
        this.optionalFileDefinitions = this.optionalFileDefinitions.filter(criterion => {
          return !idsToRemove.includes(criterion.id);
        });


        console.log("filteredData :::< ", this.otherDocuments);
        console.log("data :::< ", data);

      }
      console.log("otherDocuments optionnel > ", this.otherDocuments)
      console.log("optionnel optionnel > ", this.optionalFileDefinitions)
      console.log("optionnel origi > ", this.originalOptionalFileDefinitions)

    })


  }

  filename: any;
  showpopupName = false;
  idelem
  isScanner: any = false;

  triggerFilechange(s: string, labelEditable) {
    this.isScanner = false
    this.idelem = s
    if (labelEditable) {
      this.filename = ""
      this.showpopupName = true;
    } else {
      document.getElementById(s).click();

    }

  }

  /*FOR SCANNER */
  index: number
  reqFileDefName
  reqFileDefLabel
  fileDefinitionId
  labelEditable

  scannerdocument() {
    this.fileservice.getscan_preferencesByName(this.cookieService.get('scannerProfil')).subscribe(async (data: any) => {
          let selectedprofile = await data

          let authorizationtokenScan = await this.communService.authorizationToken(this.ModuleScan)

          this.loadingVisible = false;
          //TODO HELMI
          //res.title

          this.Scanner(this.cookieService.get('scannerName'), selectedprofile, 'new', 'title', authorizationtokenScan);
          //this.saveFromScanner = true;


        }
    );
  }
  reqFileDef:any

  triggerscanner(data) {

    console.log("data in scanner::::>", data)
    this.reqFileDef=data ;

    // this.reqFileDefName = data.name
    // this.fileDefinitionId = data.id
    // this.labelEditable = data.labelEditable
    // this.index = data.id
    // this.reqFileDefLabel = data.label
    this.loadingVisible = true;
    // this.saveFromScanner = false;
    if ((this.cookieService.get('scannerName')) != 'null' && (this.cookieService.get('scannerName')) != ' ' && (this.cookieService.get('scannerName')) != '' && (this.cookieService.get('scannerName')) != 'undefined' &&
        (this.cookieService.get('scannerProfil')) != 'undefined' && (this.cookieService.get('scannerProfil')) != '' && (this.cookieService.get('scannerProfil') != ' ' && (this.cookieService.get('scannerProfil') != 'null'))) {
      if (data.labelEditable) {
        this.isScanner = true;
        this.filename = ""
        this.showpopupName = true;
      } else {
        this.scannerdocument();

      }


    } else {
      this.loadingVisible = false;

      this.translateService.get('ATTACHEMENT.Configscannernonvalide').subscribe((res) => {
            this.toastr.error(res, '', {
              closeButton: true,
              positionClass: 'toast-top-right',
              extendedTimeOut: this.env.extendedTimeOutToastr,
              progressBar: true,
              disableTimeOut: false,
              timeOut: this.env.timeOutToastr
            });
          }
      );
    }
  }

  Scanner(scannerName, scannerProfil, filename, title, authorizationToken) {
    this.loadingVisible = true;
    //this.fileName = null

    let jsonScanPreference = (scannerProfil);
    let decision = true;
    try {
      this.fileservice.Scanner(authorizationToken,
          'Acquire',
          scannerName,
          jsonScanPreference.indicateur,
          jsonScanPreference.isPrevisualisation,
          jsonScanPreference.typedudocument.toLowerCase(),
          jsonScanPreference.rectoverso,
          jsonScanPreference.resolution,
          jsonScanPreference.mode,
          jsonScanPreference.bitDepth,
          1,
          jsonScanPreference.discardBlankPage,
          filename,
          7,
          jsonScanPreference.showlankpagethreshold,
          title,
          jsonScanPreference.enableOcr
      ).then(async (res) => {
            let fileType = res.result.fileMimeType;
            this.pstkEnabledAndRunning = this.cookieService.get("envPstkRunning") === 'true'
            let verifLicensePSTKScan: any = await this.communService.verifLicensePSTK(this.ModuleScan)

            let permissionDenied = (this.pstkEnabledAndRunning && verifLicensePSTKScan);
            let permissionToTopViewer = (fileType === 'application/pdf');
            const byteArray = new Uint8Array(atob(res.result.data).split('').map(char => char.charCodeAt(0)));
            // this.fileContent = new File([byteArray], res.result.tmpFileName, {type: this.fileType});
            // this.fileName = res.result.tmpFileName;
            // this.sizeInput = this.communService.formatBytes(byteArray.length);
            this.base64 = res.result.data;
            // this.pgNbr = res.result.pgNbr;
            let arraybuffer = this.communService.base64ToArrayBuffer(this.base64);
            if (byteArray.length > this.env.maxUploadMultiPartFile)/*presq 1MO*/
            {
              // this.disableSave = true;
              this.translateService.get('ATTACHEMENT.errorMaxSize').subscribe((res) => {
                    this.toastr.error(res + this.communService.formatBytes(this.env.maxUploadMultiPartFile), '', {
                      closeButton: true,
                      positionClass: 'toast-top-right',
                      extendedTimeOut: this.env.extendedTimeOutToastr,
                      progressBar: true,
                      disableTimeOut: false,
                      timeOut: this.env.timeOutToastr
                    });
                  }
              );
            } else {
              // this.disableSave = false;
            }
            this.loadingVisible = false;
            if (decision) {
              do {
                this.translateService.get('ATTACHEMENT.chargepagescanner').subscribe(title => {
                  decision = window.confirm(title);
                });
                if (decision) {
                  this.Scanner(this.cookieService.get('scannerName'), scannerProfil, res.result.tmpFileName, title, authorizationToken);
                  break;
                } else {
                  decision = false;
                  break;
                }
              }
              while (decision);
            }
            if (!decision) {
              decision = false;

              this.filename=this.reqFileDef.label

              this.fileType = res.result.fileMimeType;

              const byteArray = new Uint8Array(atob(this.base64).split('').map(char => char.charCodeAt(0)));
              this.fileContent = new File([byteArray],  this.filename, {type: this.fileType});
              this.CreateAttatchment(this.reqFileDef)
              // this.blobContent = new Blob([arraybuffer], {type: this.fileType});
              // this.fileContent = new File([arraybuffer], res.result.tmpFileName, {type: this.fileType});
              // this.fileName = res.result.tmpFileName;
              // let fileData = new FileData()
              // fileData.fileName = this.reqFileDefName;
              // fileData['defId'] = this.fileDefinitionId;
              // // fileData['docTitle'] = this.reqFileDefLabel;
              // if (this.labelEditable) {
              //   fileData['docTitle'] = this.filename;
              // } else {
              //   fileData['docTitle'] = this.reqFileDefLabel;
              // }
              // fileData.reqFileDefName = this.reqFileDefName;
              // // fileData.fileContentType =  this.fileType;
              // fileData.fileContentType = "application/pdf";
              // fileData.fileBase64 = this.base64;
              // this.document['attachements'][Number(this.index + '' + this.otherDocuments.length)] = fileData;
              // this.otherDocuments.unshift(fileData);
              // this.dataGridOtherDocuments.instance.refresh();
              //
              // let optionalFileDefinitions = Object.assign([], this.optionalFileDefinitions)
              // for (let fileDefinition of optionalFileDefinitions) {
              //   if (fileDefinition.name === this.reqFileDefName) {
              //     if (fileDefinition.labelEditable === false)
              //       this.optionalFileDefinitions.splice(this.optionalFileDefinitions.indexOf(fileDefinition), 1);
              //   }
              // }

            }
          }, (err) => {
            this.loadingVisible = false;
            this.translateService.get('ATTACHEMENT.AquireFailed').subscribe(title => {
              this.toastr.error(err.error.result.textError, title, {


                closeButton: true,
                positionClass: 'toast-top-right',
                extendedTimeOut: this.env.extendedTimeOutToastr,
                progressBar: true,
                disableTimeOut: false,
                timeOut: this.env.timeOutToastr
              });
            });
          }
      );
    } catch (error) {
      this.translateService.get("ATTACHEMENT.Configscannernonvalide").subscribe((res) => {
        this.toastr.error('', res + " ", {
          closeButton: true,
          positionClass: 'toast-top-right',
          extendedTimeOut: this.env.extendedTimeOutToastr,
          progressBar: true,
          disableTimeOut: false,
          timeOut: this.env.timeOutToastr
        })
      })
      this.loadingVisible = false
    }
  }

  confirmPopupName() {
    this.showpopupName = false;
    if (this.isScanner) {
      this.scannerdocument()
    } else {
      document.getElementById(this.idelem).click();

    }
  }

  // onToolbarPreparing(e) {
  //
  //   this.translateService.use("ar");
  //   e.toolbarOptions.items.unshift(
  //       {
  //         location: 'after',
  //         template: 'customtoolbar'
  //       }
  //   );
  // }


  onToolbarPreparing(e) {

    this.translateService.use("ar");

    e.toolbarOptions.items.unshift(
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            hint: "تحديث",
            icon: 'refresh',
            onClick: this.refresh.bind(this),
          }
        });
    if (this.document.userPermission === 'WRITE') {
      e.toolbarOptions.items.unshift(
          {
            location: 'after',
            widget: 'dxButton',
            options: {
              hint: "إضافة",
              icon: 'add',
              onClick: this.showPop.bind(this),
            }
          })
    }

  }


  showPop() {

    // this.filename=''
    // this.fileContent = null;
    // this.AttachementForm.reset()
    // // this.AttachementForm.get('emplacement').setValue(this.dataemplacementSource[0])
    // this.affichageMsgError=false
    // this.AttachementForm.reset()
    // this.showpopupADD = true
    this.showpopupName=true ;
  }
  refresh(e) {
    this.dataGridOtherDocuments.instance.refresh();
  }


  updateFile(e) {

    this.document['attachements'][e.data.defId] = e.data
  }

  updateFileChange(e) {
    let obj = new FormData()
    let fileData = e.oldData;
    fileData['docTitle'] = e.newData['docTitle'];
    obj.append("docTitle", fileData['docTitle'])
    obj.append("objectData", JSON.stringify(this.document))
    obj.append("objectDatasecuriteLevel", "0")
    obj.append("reqFileDefName", fileData.reqFileDefName)
    obj.append("classId", this.document.classId)
    obj.append("objectId", this.document.id)
    obj.append("locked", "false")
    obj.append("Public", "false")
    obj.append("multipartFiles", fileData.multipartFile)

    // this.lawsuitRequestsService.createAttachement(obj).subscribe(data => {
    //   this.document['attachements'][e.data.defId] = e.data
    // }, error => {
    //   e.cancel = true;
    //   this.dataGridOtherDocuments.instance.cancelEditData();
    //   this.otherDocuments.splice(this.otherDocuments.indexOf(fileData), 1)
    //
    // });
  }

  addFileOptional($event) {

  }

  ddbOptions = {
    width: 'auto',
  };

  // onFileChangeOptionalold(event: Event, reqFileDefName, reqFileDefLabel, labelEditable): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files) {
  //     this.convertFile(inputElement.files[0]).subscribe(base64 => {
  //       let fileData = new FileData()
  //       fileData.fileName = inputElement.files[0].name;
  //       fileData['defId'] = Number(index + '' + this.otherDocuments.length);
  //
  //       if (labelEditable) {
  //         fileData['docTitle'] = null;
  //       } else {
  //         fileData['docTitle'] = reqFileDefLabel;
  //       }
  //       fileData.reqFileDefName = reqFileDefName;
  //       fileData.fileContentType = inputElement.files[0].type;
  //       fileData['multipartFile'] = inputElement.files[0];
  //       fileData.fileBase64 = base64;
  //
  //       this.document['attachements'][index] = fileData;
  //       this.otherDocuments.unshift(fileData);
  //       this.dataGridOtherDocuments.instance.refresh();
  //
  //       if (labelEditable) {
  //         // Wait for the grid to render the newly added row
  //         setTimeout(() => {
  //           // Get the index of the newly added row
  //
  //           // Check if the row index is valid
  //           // Edit the newly added row
  //           this.dataGridOtherDocuments.instance.editRow(0);
  //
  //         }, 300); // Adjust the timeout value if necessary
  //
  //       }
  //       for (let fileDefinition of this.optionalFileDefinitions) {
  //         if (fileDefinition.name === reqFileDefName) {
  //           if (fileDefinition.labelEditable === false)
  //             this.optionalFileDefinitions.splice(this.optionalFileDefinitions.indexOf(fileDefinition), 1);
  //         }
  //       }
  //     });
  //   }
  // }
  fileContent: any
  fileType: any
  onFileChangeOptional(event: Event,filedefinition): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {


      this.fileContent = inputElement.files[0];
      // this.filename = inputElement.files[0].name;

      this.fileType = this.fileContent.type;

      this.CreateAttatchment(filedefinition)


    }
  }
  CreateAttatchment(reqFileDef) {
    let obj = new FormData()
    console.log("file name ::::> docTitle ",this.filename)

    obj.append("docTitle", this.filename)
    obj.append("objectData", JSON.stringify(this.document))
    obj.append("objectDatasecuriteLevel", "0")
    obj.append("reqFileDefName", reqFileDef.name)
    obj.append("classId", this.document.classId)
    obj.append("objectId", this.document.id)
    obj.append("locked", "false")
    obj.append("Public", "false")
    if (this.fileContent != null)
      obj.append("multipartFiles", this.fileContent)
    else if (this.fileContent === null || this.fileContent === undefined) {
      this.translateService.get("ATTACHEMENT.fileEmpty", reqFileDef.name).subscribe((res) => {
        this.toastr.warning(res, "", {
          closeButton: true,
          positionClass: 'toast-top-right',
          extendedTimeOut: this.env.extendedTimeOutToastr,
          progressBar: true,
          disableTimeOut: false,
          timeOut: this.env.timeOutToastr
        })
      })
    }

    if ((this.document) != undefined && (this.document).securiteLevel != null && (this.document).securiteLevel != undefined)
      obj.append("objectDatasecuriteLevel", (this.document).securiteLevel);


    let paramsHttp = new HttpParamMethodPost(this.env.apiUrlkernel + 'createAttachement' + "?fileAccessToken=" + '', obj)
    this.httpServicesComponent.method(paramsHttp, reqFileDef.name).then(data => {

      this.getdatasource();

    })

  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }

  infos: boolean[] = []

  showInfo(index) {
    var collapseElement = document.getElementById('info' + index);
    if (collapseElement.classList.contains('show')) {
      collapseElement.classList.remove('show');
    } else {
      collapseElement.classList.add('show');
    }
  }

  hideInfo(index) {
    var collapseElement = document.getElementById('info' + index);
    if (collapseElement.classList.contains('show')) {
      collapseElement.classList.remove('show');
    } else {
      collapseElement.classList.add('show');
    }
  }


  popupDeleteFileVisible: boolean = false
  Ref = {value: ''};
  FileToDelete: any

  OpenPopupDelete(e) {
    this.FileToDelete = e
    this.popupDeleteFileVisible = true
  }


  DeleteFile() {
    this.popupDeleteFileVisible = false;


    let paramsHttp = new HttpParamMethodDelete(this.env.apiUrlkernel + "attachementRemove?uuid=" + this.FileToDelete.uuid + "&fileAccessToken=" + this.fileAccessToken, '')
    this.Ref.value = this.FileToDelete.docTitle

    this.httpServicesComponent.method(paramsHttp, this.Ref, "ATTACHEMENT.deleted", "ATTACHEMENT.deleteError").then(data => {
      if (!this.FileToDelete.requestFileDefinition.labelEditable)
        this.mandatoryFileDefinitions.unshift(this.originalOptionalFileDefinitions.find(elem => elem.id == this.FileToDelete.requestFileDefinition.id))

      this.getdatasource()
      //   this.AppelWsGetById.emit(true)/*getbyid*/

    })
  }


  fileExtractedContent: any;

  consulterPjs(data, longContent) {
    console.log("data:::> ", data)
    this.objectFile = data

    // this.lawsuitRequestsService.extractfileByUIID(data.uuid, '').subscribe(async (file: any) => {
    //   if (this.objectFile.fileType === 'application/pdf')
    //     this.reloadViewerTemp(file.body, this.objectFile.docTitle, this.objectFile.fileType)
    //   else
    //     this.fileExtractedContent = file.body;
    //
    //   this.modalService.open(longContent, {scrollable: true, size: 'xl', backdrop: 'static'});
    //
    // });

  }


  pdfSrcc: any;

  visionneuse: any;


  base64
  selectedFileDefinition: any;

  reloadViewer(base64String, filename, type) {

    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const file = new File([byteArray], filename, {type: type});
    this.pdfSrcc = URL.createObjectURL(file);
    this.visionneuse = 'url';
  }

  reloadViewerTemp(arrayBuffer, filename, type) {

    const file = new File([arrayBuffer], filename, {type: type});
    console.log(URL.createObjectURL(file));
    this.pdfSrcc = URL.createObjectURL(file);
    this.visionneuse = 'url';
  }

  onValueChanged($event: any) {
    
  }
}

export class ReQFiles {
  faIcon: string;
  defaultFile: boolean;
  description: string | null;
  fileRequired: boolean;
  hasAddButton: boolean;
  hasExpirationDate: string;
  hasIdRegex: string;
  hasIssueAdress: string;
  hasIssueDate: string;
  hasLockButton: boolean;
  hasModelOfficeButton: boolean;
  hasRattachButton: boolean;
  hasScanButton: boolean;
  id: number;
  idRegex: string | null;
  idRegexIsRequired: boolean;
  issueAdressIsRequired: boolean;
  label: string;
  labelEditable: boolean;
  maxCopies: number;
  minCopies: number;
  name: string;
  attachement: any [] = []


  constructor(faIcon: string, defaultFile: boolean, description: string | null, fileRequired: boolean, hasAddButton: boolean, hasExpirationDate: string, hasIdRegex: string, hasIssueAdress: string, hasIssueDate: string, hasLockButton: boolean, hasModelOfficeButton: boolean, hasRattachButton: boolean, hasScanButton: boolean, id: number, idRegex: string | null, idRegexIsRequired: boolean, issueAdressIsRequired: boolean, label: string, labelEditable: boolean, maxCopies: number, minCopies: number, name: string, attachement: any[]) {
    this.faIcon = faIcon;
    this.defaultFile = defaultFile;
    this.description = description;
    this.fileRequired = fileRequired;
    this.hasAddButton = hasAddButton;
    this.hasExpirationDate = hasExpirationDate;
    this.hasIdRegex = hasIdRegex;
    this.hasIssueAdress = hasIssueAdress;
    this.hasIssueDate = hasIssueDate;
    this.hasLockButton = hasLockButton;
    this.hasModelOfficeButton = hasModelOfficeButton;
    this.hasRattachButton = hasRattachButton;
    this.hasScanButton = hasScanButton;
    this.id = id;
    this.idRegex = idRegex;
    this.idRegexIsRequired = idRegexIsRequired;
    this.issueAdressIsRequired = issueAdressIsRequired;
    this.label = label;
    this.labelEditable = labelEditable;
    this.maxCopies = maxCopies;
    this.minCopies = minCopies;
    this.name = name;
    this.attachement = attachement;
  }
}

