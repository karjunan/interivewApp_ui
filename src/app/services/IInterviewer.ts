import { NumberFormatStyle } from "@angular/common";



export interface IInterviewer {

    interviewerID: String,
    firstName: String,
    lastName: String,
    emailId: String,
    contactNumber: String,
    createdDate: String,
    modifiedDate: String,
    technology: String,
    exp: number;   
}

export class Interviewer implements IInterviewer {
    
    constructor(public interviewerID: String ='',
                public firstName: String = '',
                public lastName: String = '',
                public emailId: String = '',
                public contactNumber: String ='',
                public createdDate: String ='',
                public modifiedDate: String = '',
                public technology: String ='',
                public exp: number) {
                }

}