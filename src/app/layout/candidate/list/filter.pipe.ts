import { Pipe, PipeTransform } from '@angular/core';
import { CandidateService } from '../../../services/candidate.service';
import { Subscription } from 'rxjs/Subscription';
import { ICandidate } from '../../../services/ICandidate';

@Pipe({
  name: 'candidateFilter'
})

export class FilterPipe implements PipeTransform {

    display : String;
    candidates : ICandidate[];
    dbCandidates: ICandidate[];
    subscription: Subscription;
    transformCandidates: ICandidate[];

    constructor( private _candidateService: CandidateService) {

    }

  transform(items: ICandidate[], searchText: string): ICandidate[] {
    // console.log("searchText  " + searchText);
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    if(searchText.length === 1 )  {
        this.subscription =  this._candidateService.searchCandidates( searchText  )
        .subscribe(data => {
            this.dbCandidates = data,
           console.log("Items :" + this.dbCandidates);
           });
     return this.dbCandidates;
    } else {
        console.log("total records :: " + this.dbCandidates.length + ":::" + searchText);
        this.transformCandidates = this.dbCandidates;
        return this.filterRecords(this.dbCandidates, searchText);
    }
}

    private filterRecords(interviewer: ICandidate[] , searchText: string): ICandidate[] {
        return this.transformCandidates.filter((inter) => {
            return inter.firstName.toLowerCase().includes(searchText) ||
                     inter.lastName.toLowerCase().includes(searchText) ||
                     inter.candidateId.toLowerCase().includes(searchText) ||
                     inter.technologyStack.toLowerCase().includes(searchText);
        });

    }
}
