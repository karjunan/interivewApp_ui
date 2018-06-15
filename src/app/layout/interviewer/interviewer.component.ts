import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-interviewer',
    templateUrl: './interviewer.component.html',
    styleUrls: ['./interviewer.component.scss'],
    animations: [routerTransition()]
})
export class InterviewerComponent implements OnInit {
    interviewer: any [];
    loadAddTemplate:boolean = false;

    loadTemplate(): void {
        this.loadAddTemplate = !this.loadAddTemplate;
    }

    ngOnInit() {}

}
