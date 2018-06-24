import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [CommonModule,
             LoginRoutingModule,
             ReactiveFormsModule
             ],
    declarations: [LoginComponent]
})
export class LoginModule {

    
}
