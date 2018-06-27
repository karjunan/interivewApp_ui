import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


import {CandidateService} from '../../../services/candidate.service';
import {ICandidate} from '../../../services/ICandidate';


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

    filteredCandidates: ICandidate[];

   constructor(  private router: Router,

                private candidateService: CandidateService) {

   }

    ngOnInit() {
       this.load();
    }

    private load() {
        this.candidateService.getCandidates()
                .subscribe(data => {
                    this.candidates = data,
                    error => this.errorMessage = <any>error;
                 }
                );
    }

    private delete(id: String) {
        this.candidateService.deleteCandidate(id)
                            .subscribe(() => this.onSaveComplete(),
                                        error => this.errorMessage = <any>error);

    }

    private onSaveComplete(): void {
        this.load();

    }

}