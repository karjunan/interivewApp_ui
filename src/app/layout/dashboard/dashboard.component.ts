import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef, Directive } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { ICandidate } from '../../services/ICandidate';
import { IInterview } from '../../services/IInterview';
import { IInterviewService } from '../../services/IInterviewService';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Interviewer, IInterviewer } from '../../services/IInterviewer';
import { InterviewerService } from '../../services/interviewer.service';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
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
    listFilter: String = '';
    list : any [] = new  Array();
    pendingCount: Number;
    ackCount:Number;
    approvedCount:Number;
    employeeID:string;
    editedPending:boolean = false;
    editedAck:boolean = false;
    editedApproved:boolean = false;
    public modalRef: BsModalRef;
    interviewers: IInterviewer[];
    isLoaded:boolean;
    template: TemplateRef<any>;
 
    selectedCandidate:ICandidate;
    

    test:any[] = new Array();

    constructor(private router: Router,
        private _ipendingService: IInterviewService,
        private _icandidateService: CandidateService,
        private modalService: BsModalService,
        private _interviewerService:InterviewerService){}

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
                                console.log(" Candidate data for Pending: " + JSON.stringify(data));
                                this.iPendingcandidateList.push(candidateData);
                            });
                    }
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
                                console.log(" Candidate data for Acknowledge: " + JSON.stringify(data));
                                this.iAckcandidateList.push(candidateData);
                            });
                    }
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
                                candidateData.interviewerObjectID=list.interviewerId;
                                // console.log(" Candidate data : " + JSON.stringify(data));
                                this.iApprovedCandidateList.push(candidateData);
                                console.log(" Candidate data for Approved : " + JSON.stringify(this.iApprovedCandidateList));
                                
                            });
                    }
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

    // private approveInterview() {
    //     this._ipendingService.approveInterview(this.selectedCandidate.interviewObjectID,
    //                     this.selectedManagerID,"M")
    //     .subscribe(() => this.onSaveComplete(),
    //                 error => this.errorMessage = <any>error);

    // }   

    private rejectInterview(candidate: ICandidate) {
        this._ipendingService.rejectInterview(candidate.interviewObjectID)
        .subscribe(() => this.onSaveComplete(),
                    error => this.errorMessage = <any>error);

    }  
    
    private nextRound() {
        // this._ipendingService.nextRound(this.selectedCandidate.interviewObjectID,
        //                         this.selectedInterviewerId)
        // .subscribe(() => this.onSaveComplete(),
        //             error => this.errorMessage = <any>error);

    } 

    private loadInterviewers() {
        return this._interviewerService.getInterviewers()
            .subscribe(data => {
                this.interviewers = data;
                console.log("Interviewer Data selected ::: " + JSON.stringify(data))
            } );
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

    public openModal(template: TemplateRef<any>,candidate: ICandidate) {
        this.loadInterviewers();
        this.listFilter = '';
        this.selectedCandidate = candidate;
        this.modalRef = this.modalService.show(template);
    }
  
    private chooseManager(interviewer: IInterviewer){
        console.log("Interview Object Choosen :: " + this.selectedCandidate.interviewObjectID);
        console.log("Interviewer Choosen :: " + interviewer.employeeId);
        this._ipendingService.approveInterview(this.selectedCandidate.interviewObjectID,
            interviewer.employeeId,"M")
                .subscribe(() => {
                    this.onSaveComplete(),
                    error => this.errorMessage = <any>error;
                    this.modalRef.hide();
                })
                      
        
    }

    private chooseInterviewer(interviewer: IInterviewer) {
        console.log("Interview Object Choosen :: " + this.selectedCandidate.interviewObjectID);
        console.log("Interviewer Choosen :: " + interviewer.employeeId);
        this._ipendingService.approveInterview(this.selectedCandidate.interviewObjectID,
            interviewer.employeeId,"I")
            .subscribe(() => {
                this.onSaveComplete(),
                error => this.errorMessage = <any>error;
                this.modalRef.hide();
            })
    }
    
}
