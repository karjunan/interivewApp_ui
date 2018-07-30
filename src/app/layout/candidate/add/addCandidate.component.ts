import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { CandidateForm } from './candidate_form';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { CandidateService } from '../../../services/candidate.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'add-candidate',
    templateUrl: './addCandidate.component.html',
    styleUrls: ['./addCandidate.component.scss'],
    // animations: [routerTransition()]
})
export class AddCandidateComponent implements OnInit {
    selectedMoment:Date;
    addCandidateForm: FormGroup;
    errorMessage: string;
    candidate: CandidateForm = new CandidateForm(
        '', '', '', '', '', '', '', '','','','','','');

    constructor(private fb: FormBuilder,
        private router: Router,
        private candidateService: CandidateService) {


    }

    addCandidate() {
        if (this.addCandidateForm.dirty && this.addCandidateForm.valid) {
            // Copy the form values over the product object values
            // let p = Object.assign({}, this.interviewer, this.addInterviewerForm.value);
            let p = Object.assign({}, this.addCandidateForm.value)

            this.candidateService.saveCandidate(p)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.addCandidateForm.dirty) {
            this.onSaveComplete();
        }

    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.addCandidateForm.reset();
        this.router.navigate(['/candidate']);

    }

    ngOnInit(): void {
        this.addCandidateForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.maxLength(50)]],
            lastName: ['', [Validators.required, Validators.maxLength(50)]],
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]+')]],
            experience: '',
            technologyStack: '',
            gender: '',
            isActive: '',
            resume: '',
            interviewDate: ['', [Validators.required]],
            // interviewTime: ['', [Validators.required]]
        });
    }
}
