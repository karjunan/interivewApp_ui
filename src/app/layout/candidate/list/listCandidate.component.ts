import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';


import {CandidateService} from '../../../services/candidate.service';
import {ICandidate} from '../../../services/ICandidate';
import { IInterviewService } from '../../../services/IInterviewService';
import { ICandidateStatus } from '../../../services/ICandidateStatus';
import { BsModalService } from '../../../../../node_modules/ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'list-candidate',
    templateUrl: './listCandidate.component.html',
    styleUrls: ['./listCandidate.component.scss'],
    // animations: [routerTransition()]
})
export class ListCandidateComponent implements OnInit {
    errorMessage: String;
    candidates: ICandidate[];
    candidate: ICandidate;
    listFilter: String = '';
    list: any [] = new  Array();
    conString : String = '';
    published: boolean = false;
    employeeID:String;
    candidateStatus = new Array();
    public modalRef: BsModalRef;

    filteredCandidates: ICandidate[];

   constructor(  private router: Router,
                private modalService: BsModalService,
                private candidateService: CandidateService,
                private interviewService: IInterviewService) {

   }

    ngOnInit() {
        this.employeeID = localStorage.getItem('employeeID');
       this.load();
    }

    private load() {
        this.candidateService.getAllCandidateBasedOnRecuriter(this.employeeID)
                .subscribe(data => {
                    this.candidates = data,
                    error => this.errorMessage = <any>error;
                 });
    }

    private delete(id: String) {
        this.candidateService.deleteCandidate(id)
                            .subscribe(() => this.onSaveComplete(),
                                        error => this.errorMessage = <any>error);

    }

    private publishInterview(candidate: ICandidate) {
       this.interviewService.publishInterview(candidate.candidateId, candidate.experience, candidate.technologyStack)
            .subscribe(data => {
                        candidate.interviewObjectID = data.id,
                        this.candidateService.updateCandidate(candidate,candidate.candidateId)
                                        .subscribe(()=>   this.onSaveComplete()  
                                         )
                        error => this.errorMessage = <any>error
            });

    }

    public openModal(template: TemplateRef<any>,candidateId: String) {
        this.viewDetails(candidateId);
        this.modalRef = this.modalService.show(template);
    }

    private viewDetails(candidateId:String) {
        this.interviewService.getCandidateStatus(candidateId)
            .subscribe(data => {
                for(let cs of data.candidateStatus) {
                    if(cs.interviewerType == 'I') {
                        cs.interviewerType = 'Interviewer';
                    } else if (cs.interviewerType == 'M'){
                        cs.interviewerType = 'Manager';
                    } else {
                        cs.interviewerType ="";
                    }
                }
                this.candidateStatus = data.candidateStatus;
                console.log("Candidate Data"+ JSON.stringify(this.candidateStatus));
            })
        // console.log("Candidate Detail "+ candidateId);
        
    }

    private onSaveComplete(): void {
        this.load();

    }


}
