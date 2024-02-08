import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {EnvService} from "../../../../../env.service";

@Component({
    selector: 'app-workflow-decision',
    templateUrl: './workflow-decision.component.html',
    styleUrls: ['./workflow-decision.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class WorkflowDecisionComponent implements OnInit, OnChanges {

    @Output() decisionEvent = new EventEmitter<any>();

    @Input() object: any;

    @Input() decisions: any[] = [];

    @Input() access: any = true;
    @Input() showInmodal: any = false;
    @Input() disabled: any = false;
    @Input() haveanalert: any = false;
    clicked: Boolean = false


    constructor(public location: Location, private toastr: ToastrService, private env: EnvService) {
    }

    ngOnInit() {

        this.clicked = this.disabled;

        console.log("decisions :::> ", this.decisions);
        //console.log("haveanalert :::> ", this.haveanalert);

    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    onClickDecision(object, decision, commentaire) {

        if (!this.haveanalert || (this.haveanalert && decision)) {
            this.clicked = true
            object['decision'] = decision;
            object['commentaire'] = commentaire;
            this.decisionEvent.emit(object);
            this.clicked = false
        } else {

            this.toastr.error("Vérifier listes des dossiers", "", {
                closeButton: true,
                positionClass: 'toast-top-right',
                extendedTimeOut: this.env.extendedTimeOutToastr,
                progressBar: true,
                disableTimeOut: false,
                timeOut: this.env.timeOutToastr
            })

        }


    }


    Return() {
        this.location.back();
    }
}


