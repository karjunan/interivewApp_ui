import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { RecruiterRoutingModule } from './recruiter-routing.module';
import { RecruiterComponent } from './recruiter.component';
import { AddRecruiterComponent } from './add/addRecruiter.component';
import { ListRecruiterComponent } from './list/listInterviewer.component';

@NgModule({
    imports: [
        CommonModule,
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
