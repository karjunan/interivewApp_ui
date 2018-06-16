import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { InterviewerService } from '../../../services/interviewer.service';
import { IInterviewer } from '../../../services/IInterviewer';


@Component({
    selector: 'list-interviewer',
    templateUrl: './listInterviewer.component.html',
    styleUrls: ['./listInterviewer.component.scss'],
    animations: [routerTransition()]
})
export class ListInterviewerComponent implements OnInit {   
    errorMessage: String;
    interviewers : IInterviewer[];

   constructor(private _interviewerService: InterviewerService) {

   }
    ngOnInit():void {
        this._interviewerService.getInterviewers()
                .subscribe(data => this.interviewers = data,
                            error => this.errorMessage = <any>error);
    }
}
