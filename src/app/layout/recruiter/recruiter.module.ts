import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { RecruiterRoutingModule } from './recruiter-routing.module';
import { RecruiterComponent } from './recruiter.component';
import { AddRecruiterComponent } from './add/addRecruiter.component';
import { ListRecruiterComponent } from './list/listRecruiter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditRecruiterComponent } from './edit/editRecruiter.component';
import { FilterPipe } from './list/filter.pipe';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RecruiterRoutingModule,
        NgbDropdownModule.forRoot()
       
    ],
    declarations: [
        RecruiterComponent,
        ListRecruiterComponent, 
        AddRecruiterComponent,
        EditRecruiterComponent,
        FilterPipe

    ]
})
export class RecruiterModule { }
