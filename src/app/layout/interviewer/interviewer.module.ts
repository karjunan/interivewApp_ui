import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { InterviewerRoutingModule } from './interviewer-routing.module';
import { InterviewerComponent } from './interviewer.component';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        InterviewerRoutingModule,
    ],
    declarations: [
        InterviewerComponent,
    ]
})
export class InterviewerModule {}
