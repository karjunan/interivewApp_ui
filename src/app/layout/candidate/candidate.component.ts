import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';

@Component({

  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
  public candidates;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    //this.getCandidates();
  }

  getCandidates(){
    this.candidateService.getCandidates().subscribe(
      data => {this.candidates=data},
      err => console.error(err),
      ()=>console.log('Candidates Loaded')
    );
  }

}
