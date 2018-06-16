import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-recruiter',
    templateUrl: './recruiter.component.html',
    styleUrls: ['./recruiter.component.scss'],
    animations: [routerTransition()]
})
export class RecruiterComponent implements OnInit {
    interviewer: any [];
    loadAddTemplate:boolean = false;
  
    addTemplate(): void {
        this.loadAddTemplate = !this.loadAddTemplate;
    }

    ngOnInit() {}

}
