import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';


@Component({
    selector: 'add-interviewer',
    templateUrl: './addInterviewer.component.html',
    styleUrls: ['./addInterviewer.component.scss'],
    animations: [routerTransition()]
})
export class AddInterviewerComponent implements OnInit {    
   constructor() {

   }
    ngOnInit() {}
}
