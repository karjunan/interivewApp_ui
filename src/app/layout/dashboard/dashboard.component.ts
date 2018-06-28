import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { IPending } from '../../services/IPending';
import { IPendingService } from '../../services/IPendingService';
import { Router } from '@angular/router';

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
    iack :IPending;
    listFilter: string = '';
    list : any [] = new  Array();
    pendingCount: Number;
    ackCount:Number;
    employeeID:string;


    constructor(private router: Router,
        private _ipendingService: IPendingService){}

    ngOnInit() {
        this.employeeID = localStorage.getItem('employeeID');
        this.load()
    }

    private load() {
        this._ipendingService.getPendingInterviews(this.employeeID)
                .subscribe(data => {
                    this.ipendingList = data,
                    this.pendingCount = this.ipendingList.length,
                    error => this.errorMessage = <any>error;
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
}
