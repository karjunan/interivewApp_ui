import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {ListPendingComponent} from './pending/list/listPending.component';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,

    ],
    declarations: [
        DashboardComponent,
        ListPendingComponent
    ]

})
export class DashboardModule {

}
