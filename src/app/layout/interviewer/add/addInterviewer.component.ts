import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { InterviewerForm } from './interviewer_form';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';


@Component({
    selector: 'add-interviewer',
    templateUrl: './addInterviewer.component.html',
    styleUrls: ['./addInterviewer.component.scss'],
    animations: [routerTransition()]
})
export class AddInterviewerComponent implements OnInit {
    addInterviewerForm: FormGroup;
    
    interviewer: InterviewerForm = new InterviewerForm();

    constructor(private fb: FormBuilder) {
        

    }

    addInterviewer() {
        // console.log(this.addInterviewerForm.get("interviewerID").errors.required);
        console.log('Saved: ' + JSON.stringify(this.addInterviewerForm.value));
    
    }   
   
    ngOnInit():void {
        this.addInterviewerForm = this.fb.group({
            // interviewerID:['',[Validators.required,Validators.minLength(3)]],
            firstName: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(50)]],
            lastName: ['', [Validators.required,  Validators.minLength(3),Validators.maxLength(50)]],
            emailId: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            phone: '',
            exp:'',
            tecchnology:''
        })
    }
}
