import { routerTransition } from '../../../router.animations';
import { InterviewerForm } from './interviewer_form';
import { InterviewerService } from '../../../services/interviewer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Subscription } from 'rxjs/Subscription';


import { IInterviewer } from '../../../services/IInterviewer';


@Component({
    selector: 'edit-interviewer',
    templateUrl: './editInterviewer.component.html',
    styleUrls: ['./editInterviewer.component.scss'],
    // animations: [routerTransition()]
})
export class EditInterviewerComponent implements OnInit, AfterViewInit, OnDestroy  {
    
    editInterviewerForm: FormGroup;

    errorMessage: string; 
    displayMessage: { [key: string]: string } = {};
    // interviewer: InterviewerForm = new InterviewerForm(
    //     '','','','','','','','');
    
    interviewer: IInterviewer;

    private sub: Subscription;
   
    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private interviewerService: InterviewerService) {

            console.log(this.route.snapshot.paramMap.get('id'));

    }
    
    editInterviewer() {

        if (this.editInterviewerForm.dirty && this.editInterviewerForm.valid) {
            let _id = this.route.snapshot.paramMap.get('id')
            console.log("Current id is :" +this.route.snapshot.paramMap.get('id'));
            // Copy the form values over the product object values
            // let p = Object.assign({}, this.interviewer, this.addInterviewerForm.value);
            console.log("Current Interviewer value before merge : " + this.editInterviewerForm.value)
            let p = Object.assign({},this.editInterviewerForm.value);
            this.interviewerService.updateInterviewer(p,_id)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.editInterviewerForm.dirty) {
            this.onSaveComplete();
        }
    
    }   

    getInterviewer(id:String): void {
        this.interviewerService.getInterviewer(id)
            .subscribe(
                    (interviewer) => this.onInterviewerReterived(interviewer),
                    (error: any) => this.errorMessage = <any>error
        );
    }

    onInterviewerReterived(interviewer: IInterviewer) { 
        if (this.editInterviewerForm) {
            this.editInterviewerForm.reset();
        }
        this.interviewer = interviewer;
        this.editInterviewerForm.setValue({
             employeeId: this.interviewer.employeeId,
            firstName: this.interviewer.firstName,
            lastName:this.interviewer.lastName,
            emailId:this.interviewer.emailId,
            contactNumber:this.interviewer.contactNumber,
            technologyCommunity:this.interviewer.technologyCommunity,
            bandExperience:this.interviewer.bandExperience,
        });
    }


    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.editInterviewerForm.reset();
        this.router.navigate(['/interviewer']);
        
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

   
    ngOnInit():void {
        this.editInterviewerForm = this.fb.group({
            employeeId:'',
            firstName: '',
            lastName:'',
            emailId: '',
            contactNumber:  [''],
            bandExperience:'',
            technologyCommunity:''
        })

        // let id = this.route.snapshot.paramMap.get('id');
        this.sub = this.route.params.subscribe(
            params => {
                let id = params['id'];
                console.log("ID is ::"+ id)
                this.getInterviewer(id);
            }
        );
        
    }

    ngAfterViewInit(): void {
        // // Watch for the blur event from any input element on the form.
        // let controlBlurs: Observable<any>[] = this.formInputElements
        //     .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // // Merge the blur event observable with the valueChanges observable
        // Observable.merge(this.productForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
        //     this.displayMessage = this.genericValidator.processMessages(this.productForm);
        // });
    }

}
