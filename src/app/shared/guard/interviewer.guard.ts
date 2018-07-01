import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class InterviewerGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        // console.log(" Inside can Activate User role is : " + localStorage.getItem('role') );
        if (localStorage.getItem('role') === "I" || localStorage.getItem('role') === 'A' || localStorage.getItem('role') === 'M') {
            console.log("User role is : " + localStorage.getItem('role') );
            return true;
        }

        this.router.navigate(['/access-denied']);
        return false;
    }
}
