import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { IPending } from '../../services/IPending';
import { IPendingService } from '../../services/IPendingService';
import { Router } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { ICandidate } from '../../services/ICandidate';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    display: false;
    errorMessage: String;
    ipendingList: IPending[];
    iackList: IPending[];
    ipending: IPending;
    icandidateList: ICandidate[] = new  Array();;
    iack :IPending;
    listFilter: string = '';
    list : any [] = new  Array();
    pendingCount: Number;
    ackCount:Number;
    employeeID:string;
    edited:boolean = false;

    constructor(private router: Router,
        private _ipendingService: IPendingService,
        private _icandidateService: CandidateService){}

    ngOnInit() {
        this.employeeID = localStorage.getItem('employeeID');
        console.log("Employee ID at init: " + this.employeeID);
        this.load();
    }

    private load() {
        this._ipendingService.getPendingInterviews(this.employeeID)
                .subscribe(data => {
                    // console.log("Employee ID: " + this.employeeID);
                    this.ipendingList = data,
                    this.pendingCount = this.ipendingList.length,
                    error => this.errorMessage = <any>error;
                    for(let list of this.ipendingList) {
                         console.log("List dataa  :: " + list.id);
                         this._icandidateService.getCandidate(list.candidateId)
                            .subscribe(candidateData => {
                                candidateData.interviewObjectID=list.id;
                                console.log(" Candidate data : " + JSON.stringify(data));
                                this.icandidateList.push(candidateData);
                            });
                    }
                    console.log("candidate data" + JSON.stringify(this.icandidateList))
                 }

            );

        this._ipendingService.getAcknowledgedInterviews(this.employeeID)
                .subscribe(data => {
                    this.iackList = data,
                    this.ackCount = this.iackList.length,
                    error => this.errorMessage = <any>error;
                });
    }


    private setDisplay(){
        //this.display= view ;
        this.edited = true;

    }

    private acknowledge(candidate: ICandidate) {
            this._ipendingService.acknowledgeInterview(candidate.interviewObjectID,this.employeeID)
            .subscribe(data => {
                console.log("Subscribed the candidate : " + JSON.stringify(data));
            });
    }
}
