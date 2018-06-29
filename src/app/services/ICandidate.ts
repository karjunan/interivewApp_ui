import { NumberFormatStyle } from "@angular/common";

export interface ICandidate {

    candidateId: String;
    firstName: String;
    lastName: String;
    gender: String;
    technologyStack: String;
    isActive: boolean ;
    experiance: String;
    phoneNumber: String;
    email: String;
    createdBy: String;
    resume: String;
    interviewDate: String;
    interviewTime: String;
    interviewObjectID:String;

}

export class Candidate implements ICandidate {

    constructor(

        public candidateId: '',
        public firstName: '',
        public lastName: '',
        public gender: '',
        public technologyStack: '',
        public isActive: true,
        public experiance: '',
        public phoneNumber: '',
        public email: '',
        public createdBy: '',
        public resume: '',
        public interviewDate: '',
        public interviewTime: '',
        public interviewObjectID:''

    ) {
    }

}
