import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: './login/login.module#LoginModule' },    
    { path: 'dashboard', loadChildren: './layout/layout.module#LayoutModule'},
    // { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
    //  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
