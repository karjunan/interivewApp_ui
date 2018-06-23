import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router, ActivatedRoute } from '@angular/router';


import { InterviewerService } from '../../../services/interviewer.service';
import { IInterviewer } from '../../../services/IInterviewer';


@Component({
    selector: 'list-interviewer',
    templateUrl: './listInterviewer.component.html',
    styleUrls: ['./listInterviewer.component.scss'],
    // animations: [routerTransition()]
})
export class ListInterviewerComponent implements OnInit {   
    errorMessage: String;
    interviewers : IInterviewer[];
    interviewer: IInterviewer;
    listFilter: String = '';
    list : any [] = new  Array();
    conString : String = ''; 
   
    filteredInterviewers: IInterviewer[];

   constructor(  private router: Router,
                private _interviewerService: InterviewerService) {

   }

    ngOnInit():void {
        this.load();
    }

    private load() {
        this._interviewerService.getInterviewers()
                .subscribe(data => {
                    this.interviewers = data,
                    error => this.errorMessage = <any>error;
                 }
                       
                );
    }
    
    private delete(id: String) {
        this._interviewerService.deleteInterviewer(id)
                            .subscribe(() => this.onSaveComplete(),
                                        error => this.errorMessage = <any>error);

    }   

    private onSaveComplete(): void {
        this.load();
        
    }
   
}
