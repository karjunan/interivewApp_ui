import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';


@Component({
    selector: 'add-recruiter',
    templateUrl: './addrecruiter.component.html',
    styleUrls: ['./addrecruiter.component.scss'],
    animations: [routerTransition()]
})
export class AddRecruiterComponent implements OnInit {    
    constructor() {

   }
    ngOnInit() {}
}
