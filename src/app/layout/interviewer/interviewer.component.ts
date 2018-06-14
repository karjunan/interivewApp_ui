import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-interviewer',
    templateUrl: './interviewer.component.html',
    styleUrls: ['./interviewer.component.scss'],
    // animations: [routerTransition()]
})
export class InterviewerComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    closeResult: string;
   
   
   
    ngOnInit() {}

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

}
