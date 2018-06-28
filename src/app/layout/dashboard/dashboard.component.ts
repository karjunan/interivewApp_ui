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

    errorMessage: String;
    ipendingList: IPending[];
    ipending: IPending;
    listFilter: String = '';
    list : any [] = new  Array();
    conString : String = ''; 
   
    constructor(private router: Router,
        private _ipendingService: IPendingService){}

    ngOnInit() {
        this.load()
    }

    private load() {
        this._ipendingService.getPendingInterviews(this.ipending.id)
                .subscribe(data => {
                    this.ipendingList = data,
                    error => this.errorMessage = <any>error;
                 }
                       
                );
    }
}
