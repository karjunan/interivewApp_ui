import { Pipe, PipeTransform } from '@angular/core';
import { InterviewerService } from '../../../services/interviewer.service';
import { Subscription } from 'rxjs/Subscription';
import { IInterviewer } from '../../../services/IInterviewer';

@Pipe({
  name: 'pendingfilter'
})

export class FilterPipe implements PipeTransform {

    display : String;
    interviewers : IInterviewer[];
    dbInterviewers: IInterviewer[];
    subscription: Subscription;
    transformInterviewers: IInterviewer[];

    constructor( private _interviewerService: InterviewerService) {

    }

  transform(items: IInterviewer[],searchText: string): IInterviewer[] {
    // console.log("searchText  " + searchText);
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    if(searchText.length === 1 )  {
        this.subscription =  this._interviewerService.searchInterviewer( searchText  )
        .subscribe(data => {
            this.dbInterviewers = data,
           console.log("Items :" + this.dbInterviewers)
           });
     return this.dbInterviewers;
    } else {
        console.log("total records :: " + this.dbInterviewers.length + ":::" + searchText);
        this.transformInterviewers = this.dbInterviewers;
        return this.filterRecords(this.dbInterviewers, searchText);
    }
}

    private filterRecords(interviewer: IInterviewer[] , searchText: string): IInterviewer[] {
        return this.transformInterviewers.filter((inter) => {
            return inter.firstName.toLowerCase().includes(searchText)||
                     inter.lastName.toLowerCase().includes(searchText) ||
                     inter.interviewerID.toLowerCase().includes(searchText) ||
                     inter.technologyCommunity.toLowerCase().includes(searchText);
        });

    }
}
