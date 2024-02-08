import {NgModule} from '@angular/core';
import {AttachmentComponent} from './attachment.component';
import {DataGridAttachmentsComponent} from './data-grid-attachments/data-grid-attachments.component';
import {TemplateAttachmentComponent} from './template-attachment/template-attachment.component';
import {SignatureComponent} from './signature/signature.component';
import {DocViewerComponent} from './ngx-doc-viewer-file/docViewer.component';
import {ThumbnailComponent} from './thumbnail/thumbnail.component';
import {PopupAttachmentViewerComponent} from './popup-attachment-viewer/popup-attachment-viewer.component';
import {ContainerTopViewerComponent} from './container-top-viewer/container-top-viewer.component';
import { PsToolsModule } from '../ps-tools/ps-tools.module';
import { DragAndDropAttachmentComponent } from './drag-and-drop-attachment/drag-and-drop-attachment.component';
import {SharedModuleModule} from "../shared-module/shared-module.module";
import {NgxDocViewerModule} from "ngx-doc-viewer";

@NgModule({
    declarations: [
        AttachmentComponent,
        DataGridAttachmentsComponent,
        TemplateAttachmentComponent,
        SignatureComponent,
        DocViewerComponent,
        ThumbnailComponent,
        ContainerTopViewerComponent,
        PopupAttachmentViewerComponent,
        DragAndDropAttachmentComponent
    ],
    imports: [

        PsToolsModule,
        SharedModuleModule,
        NgxDocViewerModule,


    ],
    exports: [
        AttachmentComponent,
        SignatureComponent,
        DataGridAttachmentsComponent,
        TemplateAttachmentComponent,
        ThumbnailComponent,
        DocViewerComponent,
        PsToolsModule,
        DragAndDropAttachmentComponent,

    ]
})
export class AttachmentModule {
}
