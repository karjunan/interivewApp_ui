import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { InterviewerGuard } from '../shared/guard/interviewer.guard';
import { RecruiterGuard } from '../shared/guard/recruiter.guard';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
    
    children: [
        { path: '', redirectTo: 'dashboard' },
        { path: 'interviewer', loadChildren: './interviewer/interviewer.module#InterviewerModule', canActivate: [InterviewerGuard]},
        { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
        { path: 'candidate', loadChildren: './candidate/candidate.module#CandidateModule', canActivate: [RecruiterGuard] },
        { path: 'recruiter', loadChildren: './recruiter/recruiter.module#RecruiterModule', canActivate: [RecruiterGuard] },
        { path: 'access-denied', loadChildren: '../access-denied/access-denied.module#AccessDeniedModule' },

    ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
