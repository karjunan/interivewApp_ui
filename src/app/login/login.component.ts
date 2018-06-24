import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormGroup, FormBuilder } from '@angular/forms';
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
            user:'',
            pass: ''
          })

    }

    onLoggedin() {
        this._loginService.getUser(this.loginForm.value.user,this.loginForm.value.pass)
                .toPromise().then(data => {
                    console.log("data" + data);
                    this.iLogin = data;
                    if(null == this.iLogin) {
                        this.router.navigate(["/login"]);
                        localStorage.setItem('isLoggedin', 'false');
                    } else {
                        localStorage.setItem('isLoggedin', 'true');
                        this.router.navigate(['/dashboard']);  
                    }
                    (error: any) => this.errorMessage = <any>error
                }); 
    }
}
