export interface IStatus {

    interviewerId:String;
    interviewStatus:String;
    creationTime:String;
    interviewerType:String;

}

export class Status implements IStatus{

    constructor(
    public interviewerId: '',
    public interviewStatus: '',
    public creationTime: '',
    public interviewerType: '') { }

}