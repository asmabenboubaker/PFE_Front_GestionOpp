import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttachmentComponent} from './attachment.component';
import {DataGridAttachmentsComponent} from './data-grid-attachments/data-grid-attachments.component';
import {TemplateAttachmentComponent} from './template-attachment/template-attachment.component';
import {TranslateModule} from '@ngx-translate/core';
import {SignatureComponent} from './signature/signature.component';
import {NgxDocViewerModule} from 'ngx-doc-viewer';
import {DocViewerComponent} from './ngx-doc-viewer-file/docViewer.component';
import {ThumbnailComponent} from './thumbnail/thumbnail.component';
import {ClipboardModule} from 'ngx-clipboard';
import {PopupAttachmentViewerComponent} from './popup-attachment-viewer/popup-attachment-viewer.component';
import {ContainerTopViewerComponent} from './container-top-viewer/container-top-viewer.component';
import {SharedModuleModule} from '../shared-module/shared-module.module';
import { PsToolsModule } from '../ps-tools/ps-tools.module';
import {DocumentEditorComponent} from "./document-editor/document-editor.component";
import {DocumentEditorContainerModule} from "@syncfusion/ej2-angular-documenteditor";
import { DialogModule, TooltipModule } from '@syncfusion/ej2-angular-popups';

import {
    DropDownButtonModule,
    SplitButtonModule
} from '@syncfusion/ej2-angular-splitbuttons';

import { CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';

import {
    SliderModule,
    NumericTextBoxModule,
    ColorPickerModule
} from '@syncfusion/ej2-angular-inputs';

import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';

import {
    DropDownListModule,
    ComboBoxModule,
    DropDownListAllModule,
    MultiSelectAllModule
} from '@syncfusion/ej2-angular-dropdowns';

import {
    DocumentEditorAllModule,
    DocumentEditorContainerAllModule
} from '@syncfusion/ej2-angular-documenteditor';

import { ToolbarModule, TabModule } from '@syncfusion/ej2-angular-navigations';
import { AttachementGridOnlyComponent } from './attachement-grid-only/attachement-grid-only.component';
import { DataGridAttachementWithoutTemplateComponent } from './data-grid-attachement-without-template/data-grid-attachement-without-template.component';
import { ListeattachementparametresComponent } from './listeattachementparametres/listeattachementparametres.component';
import {OtherattachementEditComponent} from "./other/otherattachement-edit/otherattachement-edit.component";
import {EditGridOptionalFileComponent} from "./edit-grid-optional-file/edit-grid-optional-file.component";

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
        DocumentEditorComponent,
        AttachementGridOnlyComponent,
        DataGridAttachementWithoutTemplateComponent,
        ListeattachementparametresComponent,
        OtherattachementEditComponent,
        EditGridOptionalFileComponent

    ],
    imports: [
        CommonModule,
        TranslateModule,
        NgxDocViewerModule,
        ClipboardModule,
        SharedModuleModule,
        PsToolsModule,
        ToolbarModule,
        DropDownListAllModule,
        ColorPickerModule,
        SplitButtonModule,
        ComboBoxModule,
        TabModule,
        DocumentEditorAllModule,
        DocumentEditorContainerAllModule,
        DropDownListModule,
        SliderModule,
        TooltipModule,
        NumericTextBoxModule,
        CheckBoxModule,
        ButtonModule,
        DropDownButtonModule,
        DialogModule,
        MultiSelectAllModule,
        ListViewAllModule,
        DocumentEditorContainerModule,

    ],
    exports: [
        AttachmentComponent,
        SignatureComponent,
        DataGridAttachmentsComponent,
        TemplateAttachmentComponent,
        ThumbnailComponent,
        DocViewerComponent,
        DocumentEditorComponent,
        PsToolsModule,
        PopupAttachmentViewerComponent,
        AttachementGridOnlyComponent,
        DataGridAttachementWithoutTemplateComponent,
        ListeattachementparametresComponent,
        OtherattachementEditComponent,
        EditGridOptionalFileComponent
    ]
})
export class AttachmentModule {
}
