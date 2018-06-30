import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IInterviewService } from '../../../../services/IInterviewService';
import { IInterview } from '../../../../services/IInterview';




@Component({
    selector: 'list-pending',
    templateUrl: './listPending.component.html',
    styleUrls: ['./listPending.component.scss'],
    // animations: [routerTransition()]
})
export class ListPendingComponent implements OnInit {
    errorMessage: String;
    ipendingList: IInterview[];
    ipending: IInterview;
    listPendingFilter: String = '';
    list : any [] = new  Array();
    conString : String = '';

    filteredIpending: IInterview[];

   constructor(  private router: Router,
                private _ipendingService: IInterviewService) {

   }

    ngOnInit():void {
        this.load();
    }

    private load() {
        /*this._ipendingService.getPendingInterviews()
                .subscribe(data => {
                    this.ipendingList = data,
                    error => this.errorMessage = <any>error;
                 }

                );*/
    }


    private onSaveComplete(): void {
        this.load();

    }

}
