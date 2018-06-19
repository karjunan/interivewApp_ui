import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';


@Component({
    selector: 'list-recruiter',
    templateUrl: './listRecruiter.component.html',
    styleUrls: ['./listRecruiter.component.scss'],
    animations: [routerTransition()]
})
export class ListRecruiterComponent implements OnInit {    
   constructor() {

   }
    ngOnInit() {}
}
