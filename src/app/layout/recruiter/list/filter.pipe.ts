import { Pipe, PipeTransform } from '@angular/core';
import { RecruiterService } from '../../../services/recruiter.service';
import { Subscription } from 'rxjs/Subscription';
import { IRecruiter } from '../../../services/IRecruiter';

@Pipe({
  name: 'recruiterFilter'
})

export class FilterPipe implements PipeTransform {

    display : String;
    recruiters : IRecruiter[];
    dbRecruiters: IRecruiter[];
    subscription: Subscription;
    transformRecruiters: IRecruiter[];

    constructor( private _recruiterService: RecruiterService) {

    }

  transform(items: IRecruiter[],searchText: string): IRecruiter[] {
    console.log("searchText  " + searchText);
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    if(searchText.length === 1 )  {
        this.subscription =  this._recruiterService.searchRecruiter( searchText  )
        .subscribe(data => {
            this.dbRecruiters = data,
           console.log("Items :" + this.dbRecruiters)
           }); 
     return this.dbRecruiters;
    } else {
        console.log("total records :: " + this.dbRecruiters.length + ":::" + searchText);
        this.transformRecruiters = this.dbRecruiters;
        return this.filterRecords(this.dbRecruiters, searchText);       
    }
}

    private filterRecords(recruiter: IRecruiter[] , searchText: string): IRecruiter[] {
        return this.transformRecruiters.filter((inter) => {
            return inter.firstName.toLowerCase().includes(searchText)||
                     inter.lastName.toLowerCase().includes(searchText) ||
                     inter.recruiterId.toLowerCase().includes(searchText);
        });
               
    }
}
