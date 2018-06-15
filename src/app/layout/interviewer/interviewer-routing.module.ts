import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterviewerComponent } from './interviewer.component';
import { AddInterviewerComponent } from './add/addInterviewer.component';
import { DeleteInterviewerComponent } from './delete/deleteInterviewer.component';

const routes: Routes = [
    {
        path: '', component: InterviewerComponent
    },
    {
        path: 'add', component: AddInterviewerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InterviewerRoutingModule {
}
