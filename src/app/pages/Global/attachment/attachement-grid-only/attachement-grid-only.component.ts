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
import CustomFileSystemProvider from 'devextreme/file_management/custom_provider';
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
    downloadUrl: SafeUrl = '';
    fileSystemProvider: CustomFileSystemProvider;
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
    // onFileUploaded(e) {
    //     console.log("File upload event:", e);
    //
    //     // Extract file data from the event object
    //     const uploadedFile = e.fileData;
    //     const parentDirectoryName = e.parentDirectory ? e.parentDirectory.name : '';
    //
    //     console.log("Uploaded file:", uploadedFile);
    //     console.log("Parent directory name:", parentDirectoryName);
    //
    //     if (parentDirectoryName === 'Images') {
    //         console.log("File uploaded to 'Images' directory");
    //         // Your file upload logic here...
    //     } else {
    //         console.log("File uploaded to a directory other than 'Images'");
    //         // Your file upload logic here...
    //     }
    // }


    onFileUploaded(e) {
        console.log("test upload")
        const uploadedFile = e.fileData;

        console.log("Parent directory name:", uploadedFile);

            console.log("test upload2")
            const formData = new FormData();
            formData.append('file', uploadedFile);

            const uploadUrl = 'http://localhost:8888/demo_war/api/addFile/27/407';

            // Send file to backend
            this.http.post(uploadUrl, formData).subscribe(
                (response) => {
                    // Handle successful upload
                    this.toastr.success('File uploaded successfully');
                    console.log('File uploaded successfully:', response);
                },
                (error) => {
                    // Handle upload error
                    this.toastr.error('Failed to upload file');
                    console.error('Failed to upload file:', error);
                }
            );

    }
    uploadFileChunk(fileData, uploadInfo, destinationDirectory, endpointUrl) {
        console.log('fileData:', fileData);
        let formData = new FormData();
        formData.append('file', fileData);

        return this.http.post(endpointUrl, formData).toPromise()
            .then((response: any) => {
                console.log("uploaded file", response);
                return response;
            })
            .catch(error => {
                // Handle error
                console.error('Upload failed:', error);
                throw error;
            });
    }
    displayImagePopup(e: DxFileManagerTypes.SelectedFileOpenedEvent) {
        this.imageItemToDisplay = e.file;
        const filePath = 'assets/files/' + this.imageItemToDisplay.dataItem.name; // Adjust based on your actual path
        this.sanitizedImagePath = this.sanitizer.bypassSecurityTrustUrl(filePath);
        this.popupVisible = true;
    }

}
