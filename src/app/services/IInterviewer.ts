import { NumberFormatStyle } from "@angular/common";



export interface IInterviewer {
    id:String,
    interviewerID: String,
    firstName: String,
    lastName: String,
    emailId: String,
    contactNumber: String,
    createdDate: String,
    modifiedDate: String,
    technologyCommunity: String,
    bandExperience: number;   
}

export class Interviewer implements IInterviewer {
    
    constructor(
                public id: String ='',
                public interviewerID: String ='',
                public firstName: String = '',
                public lastName: String = '',
                public emailId: String = '',
                public contactNumber: String ='',
                public createdDate: String ='',
                public modifiedDate: String = '',
                public technologyCommunity: String ='',
                public bandExperience: number) {
                }

}