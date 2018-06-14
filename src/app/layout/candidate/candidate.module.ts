import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { CandidateRoutingModule } from './candidate-routing.module';
import { CandidateComponent } from './candidate.component';

@NgModule({
    imports: [CommonModule, Ng2Charts, CandidateRoutingModule],
    declarations: [CandidateComponent]
})
export class CandidateModule {}
