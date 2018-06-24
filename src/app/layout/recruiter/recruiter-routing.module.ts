import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRecruiterComponent } from './add/addRecruiter.component';
import { RecruiterComponent } from './recruiter.component';

const routes: Routes = [
    {
        path: '', component: RecruiterComponent
     }
    //  ,
    // {
    //     path: 'add', component: AddRecruiterComponent
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecruiterRoutingModule {
}
