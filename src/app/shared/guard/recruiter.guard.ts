import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class RecruiterGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        if (localStorage.getItem('role') === "R" || localStorage.getItem('role') === 'A') {
            console.log("User role is : " + localStorage.getItem('role') );
            return true;
        }

        this.router.navigate(['/access-denied']);
        return false;
    }
}
