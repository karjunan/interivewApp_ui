import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router, ActivatedRoute } from '@angular/router';



import { InterviewerService } from '../../../services/interviewer.service';
import { IInterviewer } from '../../../services/IInterviewer';
import { identifierModuleUrl } from '@angular/compiler';


@Component({
    selector: 'list-interviewer',
    templateUrl: './listInterviewer.component.html',
    styleUrls: ['./listInterviewer.component.scss'],
    animations: [routerTransition()]
})
export class ListInterviewerComponent implements OnInit {   
    errorMessage: String;
    interviewers : IInterviewer[];
    interviewer: IInterviewer;
    listFilter: String = '';
   

    
    public get() : string {
        return this.listFilter
    }

    
    public set(listFilter : string) {
        this.listFilter = listFilter;
    }
    
    

    filteredInterviewers: IInterviewer[];

   constructor(  private router: Router,
                private _interviewerService: InterviewerService) {

   }

    ngOnInit():void {
        this.load();
    }

    private load() {
        this._interviewerService.getInterviewers()
                .subscribe(data => 
                        this.interviewers = data,
                        error => this.errorMessage = <any>error;
                );
    }

    onKey(event: any) { // without type info
        console.log("pressed key : " + event.key)
        let p = Object.assign({},this.interviewers)
        event = event.toLocaleLowerCase;
        p.filter((interviewer: IInterviewer) =>
            interviewer.firstName.toLocaleLowerCase().indexOf(event) !== -1);
        this.interviewers = p;
      }

    private delete(id: String) {
        this._interviewerService.deleteInterviewer(id)
                            .subscribe(() => this.onSaveComplete(),
                                        error => this.errorMessage = <any>error);

    }   

    private onSaveComplete(): void {
        this.load();
        // this.router.navigate(['/interviewers']); 
        
    }

    private performFilter(filterBy: string): IInterviewer[] {
        // filterBy = filterBy.toLocaleLowerCase();
        // return this.interviewers.filter((interviewer: IInterviewer) =>
        //      interviewer.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
   
}
