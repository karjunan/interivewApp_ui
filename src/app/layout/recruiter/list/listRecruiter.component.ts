import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router, ActivatedRoute } from '@angular/router';

import { RecruiterService } from '../../../services/recruiter.service';
import { IRecruiter } from '../../../services/IRecruiter';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
    selector: 'list-recruiter',
    templateUrl: './listRecruiter.component.html',
    styleUrls: ['./listRecruiter.component.scss'],
    animations: [routerTransition()]
})
export class ListRecruiterComponent implements OnInit {    
    errorMessage: String;
    recruiters : IRecruiter[];
    recruiter: IRecruiter;

   constructor(  private router: Router,
                private _recruiterService: RecruiterService) {

   }
    
   ngOnInit():void {
     this.load();
   }

    load() {
      this._recruiterService.getRecruiters()
        .subscribe(data => this.recruiters = data,
            error => this.errorMessage = <any>error);
    }

    delete(id: String) {
        this._recruiterService.deleteRecruiter(id)
            .subscribe(() => this.onSaveComplete(),
                error => this.errorMessage = <any>error);

    }   

    onSaveComplete(): void {
       this.load();
    }
}
