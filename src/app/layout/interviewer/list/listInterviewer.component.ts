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
    listFilter: String = 'card';
    list : any [] = new  Array();
    conString : String = ''; 
    keys: any [] = new Array(0,1,2,3,4,5,6,7,8,9,'a','b'
    ,'c','d','e','f','g','h','i','j','k','l','m','n','o','p','r'
    ,'q','s','t','u','v','w','x','y','z');
    search : any = "";

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
        console.log("char codes " + this.search.value);
        let ev = event.key.toLowerCase() 
        console.log("char codes " + event.keyCode + "," ev);
        console.log("valide key " + this.validateKeyCode(ev))
        // this.list.push(ev)
        console.log("List size before backspace :" + this.list.length)
        if( this.validateKeyCode(ev) {
            this.conString = this.conString.concat(ev);
            this.list.push(ev)
            console.log("List size after push " + this.list)         
        }
        if(Object.keys(this.list).length === 3) {
            console.log(" String to be searched is :  " + this.conString);
            this._interviewerService.searchInterviewer( this.conString  )
                         .subscribe(data => this.interviewers = data,
                                     this.onSaveComplete(),
                                    error => this.errorMessage = <any>error);
        }
       
      }

    
    private validateKeyCode ( key : String )  {
         if(this.keys.includes(key)){
            return true;
         }
            return false;
    }

  

    
    private assignValueOfInterviewer(keyPressValue : any) {
        let p = Object.assign({},this.interviewers)
        let result = this.performFilter(ev);
        console.log("result : " + Object.keys(result).length);
        result.forEach(element => {
            console.log("Elements in array : " + element.firstName)
        });
    }

    private delete(id: String) {
        this._interviewerService.deleteInterviewer(id)
                            .subscribe(() => this.onSaveComplete(),
                                        error => this.errorMessage = <any>error);

    }   

    private onSaveComplete(): void {
        this.list = new Array();
        this.conString = "";
        this.load();
        // this.router.navigate(['/interviewers']); 
        
    }

    private performFilter(filterBy: string): IInterviewer[] {
        // filterBy = filterBy.toLocaleLowerCase();
        return this.interviewers.filter((interviewer: IInterviewer) =>
             interviewer.firstName.toLowerCase().indexOf(filterBy) !== -1);
    }
   
}
