import {Component, EventEmitter, Input, OnInit, Output, SimpleChange} from '@angular/core';
import {AttachementModuleService} from '../attachement.module.service';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {EnvService} from '../../../../../env.service';

@Component({
    selector: 'app-drag-and-drop-attachment',
    templateUrl: './drag-and-drop-attachment.component.html',
    styleUrls: ['./drag-and-drop-attachment.component.scss']
})
export class DragAndDropAttachmentComponent implements OnInit {
    filedatasource: TransformedObject[]=[];
     filedataToSend: TransformedObject[]=[];
    @Input() classid: any;
    @Input() objectid: any;
    @Input() fileAccessToken;
    @Input() docId;
    @Output() fileOutput = new EventEmitter();

    constructor(private fileservice: AttachementModuleService, private translateService: TranslateService, private toastr: ToastrService, private env: EnvService) {
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        if (changes['classid'] && changes['classid'].previousValue != changes['classid'].currentValue) {
            // console.log(' this.courrierByIdDtoModel ', this.courrierByIdDtoModel )

            this.classid = changes['classid'].currentValue;
        }
        if (changes['objectid'] && changes['objectid'].previousValue != changes['objectid'].currentValue) {
            // console.log(' this.courrierByIdDtoModel ', this.courrierByIdDtoModel )

            this.objectid = changes['objectid'].currentValue;
        }
        if (changes['fileAccessToken'] && changes['fileAccessToken'].previousValue != changes['fileAccessToken'].currentValue) {
            // console.log(' this.courrierByIdDtoModel ', this.courrierByIdDtoModel )

            this.fileAccessToken = changes['fileAccessToken'].currentValue;
        }
        if (changes['docId'] && changes['docId'].previousValue != changes['docId'].currentValue) {
            // console.log(' this.courrierByIdDtoModel ', this.courrierByIdDtoModel )

            this.fileAccessToken = changes['fileAccessToken'].currentValue;
        }
        this.refresh()

    }

    ngOnInit(): void {
        this.refresh();

        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);

    }

    /*refresh get by id*/
    refresh() {
        this.getfilesByClassIdAndObjectIdAndIsReportAndDocId(this.classid, this.objectid, this.fileAccessToken,this.docId);
        // this.verifLicensePSTKDatagridAttachement()
    }

    /*refresh get by id*/

    /*GET BY OBJECT IF AND CLASS ID*/
    getfilesByClassIdAndObjectIdAndIsReportAndDocId(classeid, objectid, fileAccessToken,docId) {
        this.fileservice.getfilesByClassIdAndObjectIdAndIsReportAndDocId(classeid, objectid, fileAccessToken,docId).subscribe((data: []) => {
            let newData: any = data.sort((a: any, b: any) =>
                b.id - a.id
            );
            this.filedatasource = newData.map((item: any) => {
                if (item.transferable) {
                    return {
                        ...item, // Copy all properties from the original item
                        text: item.docTitle +'_'+item.fileName, // Add the "text" property
                        fileName: item.docTitle +'_'+item.fileName, // Add the "text" property
                    };
                }
                return item; // Return the original item for non-transferable items

            });
            // this.filedatasource = this.filedatasource.filter((obj:any) => !this.filedataToSend.includes(obj.id));

            // console.log(this.filedatasource,'______');
        }, (err) => {
            this.translateService.get('ATTACHEMENT.ErrorreloadFile').subscribe((res) => {
                this.toastr.error(res, '', {
                    closeButton: true,
                    positionClass: 'toast-top-right',
                    extendedTimeOut: this.env.extendedTimeOutToastr,
                    progressBar: true,
                    disableTimeOut: false,
                    timeOut: this.env.timeOutToastr
                });
            });
        });
    }

    onDragStart(e) {
        e.itemData = e.fromData[e.fromIndex];


    }

    onAdd(e) {
        e.toData.splice(e.toIndex, 0, e.itemData);
        // console.log('this.filedatasource', this.filedatasource);
        // console.log('this.filedataToSend', this.filedataToSend);
        this.fileOutput.emit( this.filedataToSend)

    }

    onRemove(e) {
        e.fromData.splice(e.fromIndex, 1);
        // console.log('this.filedatasource', this.filedatasource);
        // console.log('this.filedataToSend', this.filedataToSend);
        this.fileOutput.emit( this.filedataToSend)
    }
}

// Define an interface for the transformed object
interface TransformedObject {
    id: number;
    text: string;
}
