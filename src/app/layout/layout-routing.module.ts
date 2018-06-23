import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
    
    children: [
        { path: '', redirectTo: 'dashboard' },
        { path: 'interviewer', loadChildren: './interviewer/interviewer.module#InterviewerModule' },
        { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
        { path: 'candidate', loadChildren: './candidate/candidate.module#CandidateModule' },
        { path: 'recruiter', loadChildren: './recruiter/recruiter.module#RecruiterModule' }
    ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
