import { NumberFormatStyle } from "@angular/common";



export interface IInterviewer {
    id:String,
    employeeId: String,
    firstName: String,
    lastName: String,
    emailId: String,
    contactNumber: String,
    createdDate: String,
    modifiedDate: String,
    technologyCommunity: String,
    bandExperience: number  
    isDeleted:String, 
    employeeType:String,
    interviewerType:String;

}

export class Interviewer implements IInterviewer {
    
    constructor(
                public id: String ='',
                public  employeeId: '',
                 public firstName: String = '',
                public lastName: String = '',
                public emailId: String = '',
                public contactNumber: String ='',
                public createdDate: String ='',
                public modifiedDate: String = '',
                public technologyCommunity: String ='',
                public bandExperience: number=0,
                public isDeleted:String = '', 
                public employeeType:String = 'I',
                public interviewerType:String ='') {
                }

}