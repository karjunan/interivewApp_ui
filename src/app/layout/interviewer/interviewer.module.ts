import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { InterviewerRoutingModule } from './interviewer-routing.module';
import { InterviewerComponent } from './interviewer.component';
import { AddInterviewerComponent } from './add/addInterviewer.component';
import { ListInterviewerComponent } from './list/listInterviewer.component';
import { EditInterviewerComponent } from './edit/editInterviewer.component';

import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        InterviewerRoutingModule,
    ],
    declarations: [
        InterviewerComponent,
        AddInterviewerComponent,
        ListInterviewerComponent,
        EditInterviewerComponent
    ]
})
export class InterviewerModule {}
