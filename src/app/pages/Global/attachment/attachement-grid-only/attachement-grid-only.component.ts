import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from '../../shared-service/token-storage.service';
import { CommunFuncService } from '../Commun/commun-func.service';
import { EnvService } from '../../../../../env.service';
import { FileServiceService } from '../../../../Service/file-service.service';
import { DxFileManagerTypes } from 'devextreme-angular/ui/file-manager';

@Component({
    selector: 'app-attachement-grid-only',
    templateUrl: './attachement-grid-only.component.html',
    styleUrls: ['./attachement-grid-only.component.scss'],
})
export class AttachementGridOnlyComponent implements OnInit {
    fileItems: any[] = [];
    popupVisible = false;
    imageItemToDisplay = {} as DxFileManagerTypes.SelectedFileOpenedEvent['file'];
    sanitizedImagePath: SafeUrl = '';

    constructor(
        private sanitizer: DomSanitizer,
        private http: HttpClient,
        private toastr: ToastrService,
        private router: Router,
        private tokenStorage: TokenStorageService,
        private translateService: TranslateService,
        private communService: CommunFuncService,
        private fileservice: FileServiceService,
        public env: EnvService
    ) {}

    ngOnInit(): void {
        this.fileservice.getFileItems().subscribe((data) => {
            this.fileItems = data;
        });
    }

    displayImagePopup(e: DxFileManagerTypes.SelectedFileOpenedEvent) {
        this.imageItemToDisplay = e.file;
        const filePath = 'assets/files/' + this.imageItemToDisplay.dataItem.name; // Adjust based on your actual path
        this.sanitizedImagePath = this.sanitizer.bypassSecurityTrustUrl(filePath);
        this.popupVisible = true;
    }
}
