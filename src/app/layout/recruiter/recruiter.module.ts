import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { RecruiterRoutingModule } from './recruiter-routing.module';
import { RecruiterComponent } from './recruiter.component';
import { AddRecruiterComponent } from './add/addRecruiter.component';
import { ListRecruiterComponent } from './list/listRecruiter.component';
import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        RecruiterRoutingModule,
    ],
    declarations: [
        RecruiterComponent,
        AddRecruiterComponent,
        ListRecruiterComponent
    ]
})
export class RecruiterModule {}
