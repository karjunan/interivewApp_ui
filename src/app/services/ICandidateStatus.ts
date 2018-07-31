import { NumberFormatStyle } from "@angular/common";
import { IStatus } from "./IStatus";

export interface ICandidateStatus {

    candidateId: String;
    candidateStatus: IStatus[];

}

export class CandidateStatus {

    constructor(
        public candidateId:'',
        public candidateStatus:''
    ) 
    {}

}
