import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'Doc_viewer',
    styleUrls: ['./Doc_viewer.scss'],
    template: `
        <div>
            <div id="div1"></div>
            <ngx-doc-viewer id="doc1"
                            [url]=pdfSrcc 
                            [viewer]=visionneuse
                            [ngStyle]="{'height':customheight == '' ? getheigth() : customheight }"
                            style="width:100% ;">
            </ngx-doc-viewer>
            <div id="div2" style="position: absolute;bottom: 20px;"></div>
        </div>
    `,

})
export class DocViewerComponent implements OnInit {
    @Input() pdfSrcc;
    @Input() visionneuse;
    @Input() customheight = '';
    public div2: any;
    public div1epane: any;
    public div2epane: any;
    public div1: any;
    myObserver
    someEl




    constructor() {

    }

    onResize(ev) {

    }

    ngOnInit() {
    }





    getheigth() {
        if (document.getElementById('div2') != null && document.getElementById('div2') != undefined)
            this.div2 = document.getElementById('div2').getClientRects();
        if (document.getElementById('div1') != null && document.getElementById('div1') != undefined)
            this.div1 = document.getElementById('div1').getClientRects();
        if (this.div2.length != 0)
            return this.div2[0].y - this.div1[0].y + "px";
    }
}
