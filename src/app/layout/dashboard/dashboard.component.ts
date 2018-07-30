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
import { VirtualTimeScheduler } from '../../../../node_modules/rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

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
    interviewerType:string;
    managerType:boolean;
    nonManagerType:boolean;
    editedPending:boolean = false;
    editedAck:boolean = false;
    editedApproved:boolean = false;
    public modalRef: BsModalRef;
    interviewers: IInterviewer[];
    isLoaded:boolean;
    template: TemplateRef<any>;
    interType:String;
 
    selectedCandidate:ICandidate;
    

    test:any[] = new Array();

    constructor(private router: Router,
        private _ipendingService: IInterviewService,
        private _icandidateService: CandidateService,
        private modalService: BsModalService,
        private _interviewerService:InterviewerService){}

    ngOnInit() {
        this.employeeID = localStorage.getItem('employeeID');
        this.interviewerType = localStorage.getItem('interviewerType');
        console.log("Employee ID at init: " + this.employeeID);
        console.log("InterviewerType at init: ["+this.interviewerType+"]");
        this.validateInterviewerType();
        this.loadPending();
        this.loadAck();
        this.loadApproved();
    }


    private loadPending() {
        var candidateList = new  Array();
        this._ipendingService.getPendingInterviews(this.employeeID)
                .subscribe(data => {
                    // console.log("Employee ID: " + this.employeeID);
                    this.ipendingList = data,
                    this.pendingCount = this.ipendingList.length,
                    error => this.errorMessage = <any>error;
                    for(let list of this.ipendingList) {
                        candidateList.push(list.candidateId);
                        //  console.log("List dataa  :: " + list.id);
                       
                    }
                    this._icandidateService.getCandidatesByIds(candidateList)
                    .subscribe(candidateData => {
                        this.iPendingcandidateList = candidateData;
                        for(let ipendingCandidate of this.iPendingcandidateList) {
                            for(let iInterviewPending of this.ipendingList) {
                                if(ipendingCandidate.candidateId == iInterviewPending.candidateId) {
                                    ipendingCandidate.interviewObjectID = iInterviewPending.id;
                                }
                            }
                        }
                        console.log(" Pending candidate data"+JSON.stringify(this.iPendingcandidateList ));
                    });
                   
                 }

            );
    }


    private loadAck() {
        var candidateList = new  Array();
        this._ipendingService.getAcknowledgedInterviews(this.employeeID)
                .subscribe(data => {
                    this.iackList = data,
                    this.ackCount = this.iackList.length,
                    error => this.errorMessage = <any>error;
                    for(let list of this.iackList) {
                        candidateList.push(list.candidateId);
                         
                    }
                    this._icandidateService.getCandidatesByIds(candidateList)
                    .subscribe(candidateData => {
                        this.iAckcandidateList = candidateData;
                        for(let iackCanidate of this.iAckcandidateList) {
                            for(let iInterviewAck of this.iackList) {
                                if(iackCanidate.candidateId == iInterviewAck.candidateId) {
                                    iackCanidate.interviewObjectID = iInterviewAck.id;
                                }
                            }
                        }
                    });
                 }
                
            );  
    }

    private loadApproved() {
        var candidateList = new  Array();
        this._ipendingService.getApprovedInterviews(this.employeeID)
                .subscribe(data => {
                    // console.log("Employee ID: " + this.employeeID);
                    this.iapprovedList = data,
                    this.approvedCount = this.iapprovedList.length,
                    error => this.errorMessage = <any>error;
                    for(let list of this.iapprovedList) {
                        candidateList.push(list.candidateId);
                        //  console.log("List dataa  :: " + list.candidateId);
                    }
                    this._icandidateService.getCandidatesByIds(candidateList)
                    .subscribe(candidateData => {
                        this.iApprovedCandidateList = candidateData;
                        for(let iackCanidate of this.iApprovedCandidateList) {
                            for(let iInterviewAck of this.iapprovedList) {
                                if(iackCanidate.candidateId == iInterviewAck.candidateId) {
                                    iackCanidate.interviewObjectID = iInterviewAck.id;
                                }
                            }
                        }
                    });
                 }

            );
    }


    private acknowledge(candidate: ICandidate) {
            this._ipendingService.acknowledgeInterview(candidate.interviewObjectID,this.employeeID)
            .subscribe(() => this.onSaveComplete(),
                                        error => this.errorMessage = <any>error);

    }   

    private rejectInterview(candidate: ICandidate) {
        console.log("Rejected Interviews " + JSON.stringify(candidate));
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

    private loadInterviewers(candidate:ICandidate,interType:string) {
        console.log("Interviewer Type : " + interType)
        return this._interviewerService.getInterviewersByType(candidate.technologyStack,interType)
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

    validateInterviewerType():void {
        if(this.interviewerType != 'M') {
            this.nonManagerType = true;
            this.managerType = false;
        } else {
            this.managerType = true;
            this.nonManagerType = false;
        }
        
    }

    public openModal(template: TemplateRef<any>,candidate: ICandidate,interType:string) {
        console.log("Modal Interview Type : ", interType)
        this.loadInterviewers(candidate,interType);
        this.listFilter = '';
        this.selectedCandidate = candidate;
        this.modalRef = this.modalService.show(template);
    }
  
    private chooseManager(candidate: ICandidate,interType:string){
        // console.log("Interview Object Choosen :: " + candidate.interviewObjectID);
        this._ipendingService.approveInterview(candidate.interviewObjectID,
            this.employeeID,"M")
                .subscribe(() => {
                    this.onSaveComplete(),
                    error => this.errorMessage = <any>error;
                    // this.modalRef.hide();
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
