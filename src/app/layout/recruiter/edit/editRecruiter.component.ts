import { RecruiterForm } from './recruiter_form';
import { InterviewerService } from '../../../services/interviewer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Subscription } from 'rxjs/Subscription';


import { IRecruiter } from '../../../services/IRecruiter';
import { RecruiterService } from '../../../services/recruiter.service';


@Component({
    selector: 'edit-recruiter',
    templateUrl: './editRecruiter.component.html',
    styleUrls: ['./editRecruiter.component.scss'],
})
export class EditRecruiterComponent implements OnInit, AfterViewInit, OnDestroy  {
    
    editRecruiterForm: FormGroup;

    errorMessage: string; 
    displayMessage: { [key: string]: string } = {};
   
    
    recruiter: IRecruiter;

    private sub: Subscription;
   
    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private recuriterService: RecruiterService) {

            console.log(this.route.snapshot.paramMap.get('id'));

    }
    
    editRecruiter() {

        if (this.editRecruiterForm.dirty && this.editRecruiterForm.valid) {
            let _id = this.route.snapshot.paramMap.get('id')
            console.log("Current id is :" +this.route.snapshot.paramMap.get('id'));
            // Copy the form values over the product object values
            // let p = Object.assign({}, this.interviewer, this.addInterviewerForm.value);
            console.log("Current Interviewer value before merge : " + JSON.stringify(this.editRecruiterForm.value))
            let p = Object.assign({},this.editRecruiterForm.value);
            this.recuriterService.updateRecruiter(p,_id)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.editRecruiterForm.dirty) {
            this.onSaveComplete();
        }
    
    }   

    getRecruiter(id:String): void {
        this.recuriterService.getRecruiter(id)
            .subscribe(
                    (recruiter) => this.onRecruiterReterived(recruiter),
                    (error: any) => this.errorMessage = <any>error
        );
    }

    onRecruiterReterived(recruiter: IRecruiter) { 
        if (this.editRecruiterForm) {
            this.editRecruiterForm.reset();
        }
        this.recruiter = recruiter;
        this.editRecruiterForm.setValue({
            employeeId: this.recruiter.employeeId,
            firstName: this.recruiter.firstName,
            lastName:this.recruiter.lastName,
            emailId:this.recruiter.emailId,
            contactNumber:this.recruiter.contactNumber
        });
    }


    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.editRecruiterForm.reset();
        this.router.navigate(['/recruiter']);
        
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

   
    ngOnInit():void {
        this.editRecruiterForm = this.fb.group({
            employeeId:'',
            firstName: '',
            lastName:'',
            emailId: '',
            contactNumber:  [''],
        })

        // let id = this.route.snapshot.paramMap.get('id');
        this.sub = this.route.params.subscribe(
            params => {
                let id = params['id'];
                console.log("ID is ::"+ id)
                this.getRecruiter(id);
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
