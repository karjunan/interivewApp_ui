import { NumberFormatStyle } from "@angular/common";

export interface ICandidate {

    candidateId: String;
    firstName: String;
    lastName: String;
    gender: String;
    technologyStack: String;
    isActive: String;
    experience: String;
    phoneNumber: String;
    email: String;
    createdBy: String;
    resume: String;
    interviewDate: String;
    interviewTime: String;

}

export class Candidate implements ICandidate {

    constructor(

        public candidateId: '',
        public firstName: '',
        public lastName: '',
        public gender: '',
        public technologyStack: '',
        public isActive: '',
        public experience: '',
        public phoneNumber: '',
        public email: '',
        public createdBy: '',
        public resume: '',
        public interviewDate: '',
        public interviewTime: '',

    ) {
    }

}
