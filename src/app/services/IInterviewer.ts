import { NumberFormatStyle } from "@angular/common";



export interface IInterviewer {

    interviewerID: String,
    firstName: String,
    lastName: String,
    emailId: String,
    phoneNumber: String,
    createdDate: String,
    modifiedDate: String,
    technologyCommunity: String,
    bandExperience: number;   
}

export class Interviewer implements IInterviewer {
    
    constructor(public interviewerID: String ='',
                public firstName: String = '',
                public lastName: String = '',
                public emailId: String = '',
                public phoneNumber: String ='',
                public createdDate: String ='',
                public modifiedDate: String = '',
                public technologyCommunity: String ='',
                public bandExperience: number) {
                }

}