import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


import {CandidateService} from '../../../services/candidate.service';
import {ICandidate} from '../../../services/ICandidate';
import { IInterviewService } from '../../../services/IInterviewService';


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

    filteredCandidates: ICandidate[];

   constructor(  private router: Router,

                private candidateService: CandidateService,
                private interviewService: IInterviewService) {

   }

    ngOnInit() {
       this.load();
    }

    private load() {
        this.candidateService.getCandidates()
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

    private onSaveComplete(): void {
        this.load();

    }


}
