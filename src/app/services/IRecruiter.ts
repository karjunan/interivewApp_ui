import { NumberFormatStyle } from "@angular/common";



export interface IRecruiter {
    id:String,
    recruiterId: String,
    firstName: String,
    lastName: String,
    emailId: String,
    contactNumber: String,
    createdDate: String,
    modifiedDate: String,
    technologyCommunity: String,
    bandExperience: number;   
}

export class Recruiter implements IRecruiter {
    
    constructor( 
        public id: String ='',
        public recruiterId: String ='',
        public firstName: String = '',
        public lastName: String = '',
        public emailId: String = '',
        public contactNumber: String ='',
        public createdDate: String ='',
        public modifiedDate: String = '',
        public technologyCommunity: String ='',
        public bandExperience: number) { }

}