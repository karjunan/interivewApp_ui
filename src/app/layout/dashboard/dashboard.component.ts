import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { ICandidate } from '../../services/ICandidate';
import { IInterview } from '../../services/IInterview';
import { IInterviewService } from '../../services/IInterviewService';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    edited: boolean;
    errorMessage: String;
    ipendingList: IInterview[];
    iackList: IInterview[];
    ipending: IInterview;
    iapprovedList: IInterview[];
    iapproved: IInterview;

    iPendingcandidateList: ICandidate[] = new  Array();
    iAckcandidateList: ICandidate[] = new  Array();
    iApprovedCandidateList: ICandidate[] = new  Array();
    iack :IInterview;
    listFilter: string = '';
    list : any [] = new  Array();
    pendingCount: Number;
    ackCount:Number;
    approvedCount:Number;
    employeeID:string;
    editedPending:boolean = false;
    editedAck:boolean = false;
    editedApproved:boolean = false;

    constructor(private router: Router,
        private _ipendingService: IInterviewService,
        private _icandidateService: CandidateService){}

    ngOnInit() {
        this.employeeID = localStorage.getItem('employeeID');
        console.log("Employee ID at init: " + this.employeeID);
        this.loadPending();
        this.loadAck();
        this.loadApproved();
    }

    private loadPending() {
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
                                this.iPendingcandidateList.push(candidateData);
                            });
                    }
                    console.log("candidate data" + JSON.stringify(this.iPendingcandidateList))
                 }

            );

        // this._ipendingService.getAcknowledgedInterviews(this.employeeID)
        //         .subscribe(data => {
        //             this.iackList = data,
        //             this.ackCount = this.iackList.length,
        //             error => this.errorMessage = <any>error;
        //         });
    }

    private loadAck() {
        this._ipendingService.getAcknowledgedInterviews(this.employeeID)
                .subscribe(data => {
                    // console.log("Employee ID: " + this.employeeID);
                    this.iackList = data,
                    this.ackCount = this.iackList.length,
                    error => this.errorMessage = <any>error;
                    for(let list of this.iackList) {
                         console.log("List dataa  :: " + list.id);
                         this._icandidateService.getCandidate(list.candidateId)
                            .subscribe(candidateData => {
                                candidateData.interviewObjectID=list.id;
                                console.log(" Candidate data : " + JSON.stringify(data));
                                this.iAckcandidateList.push(candidateData);
                            });
                    }
                    console.log("candidate data" + JSON.stringify(this.iAckcandidateList))
                 }

            );
    }

    private loadApproved() {
        this._ipendingService.getApprovedInterviews(this.employeeID)
                .subscribe(data => {
                    // console.log("Employee ID: " + this.employeeID);
                    this.iapprovedList = data,
                    this.approvedCount = this.iapprovedList.length,
                    error => this.errorMessage = <any>error;
                    for(let list of this.iapprovedList) {
                         console.log("List dataa  :: " + list.candidateId);
                         this._icandidateService.getCandidate(list.candidateId)
                            .subscribe(candidateData => {
                                candidateData.interviewObjectID=list.interviewerId;
                                // console.log(" Candidate data : " + JSON.stringify(data));
                                this.iApprovedCandidateList.push(candidateData);
                                console.log(" Candidate data : " + JSON.stringify(this.iApprovedCandidateList));
                                
                            });
                    }
                    console.log("candidate data" + JSON.stringify(this.iApprovedCandidateList))
                 }

            );
    }


    // private setDisplay(){
    //     //this.display= view ;
    //     this.editedPending = true;

    // }

    private acknowledge(candidate: ICandidate) {
            this._ipendingService.acknowledgeInterview(candidate.interviewObjectID,this.employeeID)
            .subscribe(() => this.onSaveComplete(),
                                        error => this.errorMessage = <any>error);

    }   

    private approveInterview(candidate: ICandidate) {
        this._ipendingService.approveInterview(candidate.interviewObjectID,"6224","I")
        .subscribe(() => this.onSaveComplete(),
                    error => this.errorMessage = <any>error);

}   

    private onSaveComplete(): void {
        this.iPendingcandidateList = new Array();
        this.iAckcandidateList = new Array();
        this.iApprovedCandidateList = new Array();
        this.loadPending();
        this.loadAck();
        this.loadApproved();
        
    }

    togglePending(): void {
        this.editedPending = !this.editedPending;
        if(this.editedPending) {
            this.editedAck = false;
            this.editedApproved = false;
        }
        
    }

    
    toggleAck(): void {
        this.editedAck = !this.editedAck;
        if(this.editedAck) {
            this.editedPending = false;
            this.editedApproved = false;
        }
    }

    toggleApproved(): void {
        this.editedApproved = !this.editedApproved;
        if(this.editedApproved) {
            this.editedPending = false;
            this.editedAck = false;
        }
    }
}
