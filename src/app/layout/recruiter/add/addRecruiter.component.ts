import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { RecruiterForm } from './recruiter_form';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { RecruiterService } from '../../../services/recruiter.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'add-recruiter',
    templateUrl: './addRecruiter.component.html',
    styleUrls: ['./addRecruiter.component.scss'],
    animations: [routerTransition()]
})
export class AddRecruiterComponent implements OnInit {
    addRecruiterForm: FormGroup;
    errorMessage: string;
    recruiter: RecruiterForm = new RecruiterForm('', '', '', '', '', '');

    constructor(private fb: FormBuilder,
        private router: Router,
        private recruiterService: RecruiterService) {


    }

    addRecruiter() {
        if (this.addRecruiterForm.dirty && this.addRecruiterForm.valid) {
            let p = Object.assign({}, this.addRecruiterForm.value)
            this.recruiterService.saveRecruiter(p)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.addRecruiterForm.dirty) {
            this.onSaveComplete();
        }

    }

    onSaveComplete(): void {
        this.addRecruiterForm.reset();
        this.router.navigate(['/recruiter']);

    }

    ngOnInit(): void {
        this.addRecruiterForm = this.fb.group({
            recruiterId: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(5)]],
            firstName: ['', [Validators.required, Validators.maxLength(50)]],
            lastName: ['', [Validators.required, Validators.maxLength(50)]],
            emailId: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            contactNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]+')]]
        })
    }
}
