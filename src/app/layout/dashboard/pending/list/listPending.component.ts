import { Component, OnInit, Input } from '@angular/core';
import { IInterviewer } from '../../../../services/IInterviewer';
import { ICandidate } from '../../../../services/ICandidate';


@Component({
    selector: 'list-pending',
    templateUrl: './listPending.component.html',
    styleUrls: ['./listPending.component.scss']
})

export class ListPendingComponent implements OnInit {
    
    @Input('icandidateList') icandidate: ICandidate[];
    
    ngOnInit() {
        console.log("Candidate List : " + JSON.stringify(this.icandidate));
    }

}
