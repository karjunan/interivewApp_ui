import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { InterviewerRoutingModule } from './interviewer-routing.module';
import { InterviewerComponent } from './interviewer.component';
import { AddInterviewerComponent } from './add/addInterviewer.component';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        InterviewerRoutingModule,
    ],
    declarations: [
        InterviewerComponent,
        AddInterviewerComponent
    ]
})
export class InterviewerModule {}
