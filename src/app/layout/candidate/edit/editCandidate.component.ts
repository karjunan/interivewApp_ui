import {ActivatedRoute, Router} from '@angular/router';
import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {Subscription} from 'rxjs/Subscription';
import {ICandidate} from '../../../services/ICandidate';
import {CandidateService} from '../../../services/candidate.service';


@Component({
    selector: 'edit-candidate',
    templateUrl: './editCandidate.component.html',
    styleUrls: ['./editCandidate.component.scss'],
    // animations: [routerTransition()]
})
export class EditCandidateComponent implements OnInit, AfterViewInit, OnDestroy  {

    editCandidateForm: FormGroup;

    errorMessage: string;
    displayMessage: { [key: string]: string } = {};


    candidate: ICandidate;

    private sub: Subscription;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private candidateService: CandidateService) {

            console.log(this.route.snapshot.paramMap.get('id'));

    }

    editCandidate() {

        if (this.editCandidateForm.dirty && this.editCandidateForm.valid) {
            let _id = this.route.snapshot.paramMap.get('id')
            let p = Object.assign({},this.editCandidateForm.value);
            this.candidateService.updateCandidate(p,_id)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.editCandidateForm.dirty) {
            this.onSaveComplete();
        }

    }

    getCandidate(id:String): void {
        this.candidateService.getCandidate(id)
            .subscribe(
                    (candidate) => this.onCandidateReterived(candidate),
                    (error: any) => this.errorMessage = <any>error
        );
    }

    onCandidateReterived(candidate: ICandidate) {
        if (this.editCandidateForm) {
            this.editCandidateForm.reset();
        }
        this.candidate = candidate;
        this.editCandidateForm.patchValue({
            firstName: this.candidate.firstName,
            lastName:this.candidate.lastName,
            email:this.candidate.email,
            phoneNumber:this.candidate.phoneNumber,
            technologyStack:this.candidate.technologyStack,
            experiance:this.candidate.experience,
            isActive:this.candidate.isActive,
            gender:this.candidate.gender
        });
    }


    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.editCandidateForm.reset();
        this.router.navigate(['/candidate']);

    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }


    ngOnInit():void {
        this.editCandidateForm = this.fb.group({
            firstName: '',
            lastName: '',
            email: '',
            gender: '',
            phoneNumber: '',
            experiance: '',
            technologyStack: '',
            isActive: ''

        })

        // let id = this.route.snapshot.paramMap.get('id');
        this.sub = this.route.params.subscribe(
            params => {
                let id = params['id'];
                this.getCandidate(id);
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
