import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router, ActivatedRoute } from '@angular/router';

import { InterviewerService } from '../../../services/interviewer.service';
import { IInterviewer } from '../../../services/IInterviewer';
import { identifierModuleUrl } from '@angular/compiler';


@Component({
    selector: 'list-interviewer',
    templateUrl: './listInterviewer.component.html',
    styleUrls: ['./listInterviewer.component.scss'],
    animations: [routerTransition()]
})
export class ListInterviewerComponent implements OnInit {   
    errorMessage: String;
    interviewers : IInterviewer[];
    interviewer: IInterviewer;

   constructor(  private router: Router,
                private _interviewerService: InterviewerService) {

   }

    ngOnInit():void {
        this.load();
        // this._interviewerService.getInterviewers()
        //         .subscribe(data => this.interviewers = data,
        //                     error => this.errorMessage = <any>error);
    }

    load() {
        this._interviewerService.getInterviewers()
                .subscribe(data => this.interviewers = data,
                            error => this.errorMessage = <any>error);
    }

    delete(id: String) {
        this._interviewerService.deleteInterviewer(id)
                            .subscribe(() => this.onSaveComplete(),
                                        error => this.errorMessage = <any>error);

    }   

    onSaveComplete(): void {
        this.load();
        // this.router.navigate(['/interviewers']); 
        
    }

   
}
