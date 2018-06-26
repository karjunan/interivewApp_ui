import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { InterviewerRoutingModule } from './interviewer-routing.module';
import { InterviewerComponent } from './interviewer.component';
import { AddInterviewerComponent } from './add/addInterviewer.component';
import { ListInterviewerComponent } from './list/listInterviewer.component';
import { EditInterviewerComponent } from './edit/editInterviewer.component';

import { FilterPipe } from './list/filter.pipe';

import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        InterviewerRoutingModule,
        // NgbDropdownModule.forRoot()
        
    ],
    declarations: [
        InterviewerComponent,
        AddInterviewerComponent,
        ListInterviewerComponent,
        EditInterviewerComponent,
        FilterPipe
    ]
})
export class InterviewerModule {}
