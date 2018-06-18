import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { InterviewerForm } from './interviewer_form';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { InterviewerService } from '../../../services/interviewer.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'add-interviewer',
    templateUrl: './addInterviewer.component.html',
    styleUrls: ['./addInterviewer.component.scss'],
    animations: [routerTransition()]
})
export class AddInterviewerComponent implements OnInit {
    addInterviewerForm: FormGroup;
    errorMessage: string;
    interviewer: InterviewerForm = new InterviewerForm(
        '','','','','','','','');

    constructor(private fb: FormBuilder,
                private router: Router,
                private interviewerService: InterviewerService) {
        

    }

    addInterviewer() {
        if (this.addInterviewerForm.dirty && this.addInterviewerForm.valid) {
            // Copy the form values over the product object values
            // let p = Object.assign({}, this.interviewer, this.addInterviewerForm.value);
            let p = Object.assign({},this.addInterviewerForm.value)
            
            this.interviewerService.saveInterviewer(p)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.addInterviewerForm.dirty) {
            this.onSaveComplete();
        }
    
    }   

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.addInterviewerForm.reset();
        this.router.navigate(['/interviewer']);
        
    }
   
    ngOnInit():void {
        this.addInterviewerForm = this.fb.group({
            interviewerID:['',[Validators.required,Validators.minLength(4),Validators.maxLength(5)]],
            firstName: ['', [Validators.required, Validators.maxLength(50)]],
            lastName: ['', [Validators.required,  Validators.maxLength(50)]],
            emailId: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            contactNumber:  ['', [Validators.required, Validators.maxLength(10),Validators.pattern('[0-9]+')]],
            bandExperience:'',
            technologyCommunity:''
        })
    }
}
