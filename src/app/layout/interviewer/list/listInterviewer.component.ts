import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';


@Component({
    selector: 'list-interviewer',
    templateUrl: './listInterviewer.component.html',
    styleUrls: ['./listInterviewer.component.scss'],
    animations: [routerTransition()]
})
export class ListInterviewerComponent implements OnInit {    
   constructor() {

   }
    ngOnInit() {}
}
