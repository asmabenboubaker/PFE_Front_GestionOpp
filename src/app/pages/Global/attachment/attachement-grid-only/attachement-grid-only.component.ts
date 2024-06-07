import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostListener,
    Input, OnChanges,
    OnInit,
    Output,
    SimpleChange,
    ViewChild
} from '@angular/core';
import {DxDataGridComponent, DxFormComponent} from "devextreme-angular";
import {FormatDate} from "../../shared-service/formatDate";
import {HttpServicesComponent} from "../../ps-tools/http-services/http-services.component";
import {DeviceDetectorService} from "ngx-device-detector";
import {EnvService} from "../../../../../env.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {CookieService} from "ngx-cookie-service";
import {CommunFuncService} from "../Commun/commun-func.service";
import {DatePipe} from "@angular/common";
import {AttachementModuleService} from "../attachement.module.service";
import {FormBuilder} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {
    HttpParamMethodDelete,
    HttpParamMethodPatch,
    HttpParamMethodPost,
    HttpParamMethodPutNEwFormat
} from "../../ps-tools/class";
import {Object} from "../template-attachment/template-attachment.component";
import {Export} from "../../shared-service/export";
import * as FileSaver from 'file-saver';
import {DomSanitizer} from "@angular/platform-browser";

import {Router} from "@angular/router";
import {TokenStorageService} from "../../shared-service/token-storage.service";
import {loadMessages, locale} from "devextreme/localization";
import frMessages from "devextreme/localization/messages/fr.json";
import arMessages from "devextreme/localization/messages/ar.json";
import {ColorState} from "../../shared-service/colorState";
import CustomStore from "devextreme/data/custom_store";
import notify from "devextreme/ui/notify";
import {FileServiceService} from "../../../../Service/file-service.service";

@Component({
    selector: 'app-attachement-grid-only',
    templateUrl: './attachement-grid-only.component.html',
    styleUrls: ['./attachement-grid-only.component.scss'],

})
export class AttachementGridOnlyComponent implements OnInit{
    fileItems: any[] = [];
    constructor(private sanitizer: DomSanitizer, private ref: ChangeDetectorRef, public env: EnvService, private router: Router, private http: HttpClient, private toastr: ToastrService,
                private tokenStorage: TokenStorageService, private translateService: TranslateService, private cookieService: CookieService, public communService: CommunFuncService, private fileservice: FileServiceService) {





    }


    ngOnInit(): void {
        this.fileservice.getFileItems().subscribe((data) => {
            this.fileItems = data;
        });
    }
}
