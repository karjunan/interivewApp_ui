import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';


@Component({
    selector: 'add-interviewer',
    templateUrl: './addInterviewer.component.html',
    styleUrls: ['./addInterviewer.component.scss'],
    animations: [routerTransition()]
})
export class AddInterviewerComponent implements OnInit {    
    ngOnInit() {}

}
