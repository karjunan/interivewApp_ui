import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ILogin } from '../services/ILogin';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    
    loginForm: FormGroup;
    iLogin : ILogin;
    errorMessage: string; 


    constructor(private fb: FormBuilder,
                public router: Router,
                private _loginService: LoginService) {}

    ngOnInit() {
        this.loginForm = this.fb.group({
            user:[null,[Validators.required,Validators.email]],
            pass:[null,[Validators.required]]
          })

    }

    onLoggedin() {
        // console.log("User Name " + this.loginForm.value.user);
        // console.log(" Pass " + this.loginForm.value.pass);
        this._loginService.getUser(this.loginForm.value.user,this.loginForm.value.pass)
                .subscribe(data => {
                    console.log("data :::: " + data);
                    this.iLogin = data;
                    if(null === this.iLogin || undefined === this.iLogin) {
                        this.errorMessage= "id/Password Invalid"
                        this.router.navigate(["/login"]);
                        console.log("data null undefined :::" + this.iLogin);
                        localStorage.setItem('isLoggedin', 'false');
                    } else {
                        console.log("data" + this.iLogin);
                        localStorage.setItem('isLoggedin', 'true');
                        localStorage.setItem('employeeID',this.iLogin.employeeId);
                        localStorage.setItem('id',this.iLogin.id);
                        localStorage.setItem('emailId',this.iLogin.emailId);
                        localStorage.setItem('user',this.iLogin.firstName);
                        localStorage.setItem('role',this.iLogin.employeeType);
                        localStorage.setItem('interviewerType',this.iLogin.interviewerType);
                        console.log("Interviewer Type   " + this.iLogin.interviewerType);
                        console.log("Login role is  " + this.iLogin.employeeType);
                        console.log("Login details " + JSON.stringify(this.iLogin));
                        this.router.navigate(['/dashboard']);   
                    }

                },
                (error: any) => this.errorMessage = <any>error); 
    }
}
