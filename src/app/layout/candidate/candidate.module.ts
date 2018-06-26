import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { CandidateRoutingModule } from './candidate-routing.module';
import { CandidateComponent } from './candidate.component';
import {ListCandidateComponent} from './list/listCandidate.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {FilterPipe} from './list/filter.pipe';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        Ng2Charts,
        CandidateRoutingModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [
        CandidateComponent,
        ListCandidateComponent,
        FilterPipe
    ]
})
export class CandidateModule {}
