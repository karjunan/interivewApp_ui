import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateComponent } from './candidate.component';
import {AddCandidateComponent} from './add/addCandidate.component';
import {EditCandidateComponent} from './edit/editCandidate.component';


const routes: Routes = [
    {
        path: '',
        component: CandidateComponent
    },
    {
        path: 'add', component: AddCandidateComponent
    },
    {
        path: 'edit/:id', component: EditCandidateComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CandidateRoutingModule {}
