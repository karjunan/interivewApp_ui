import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IInterviewer } from "./IInterviewer";
import { Observable } from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

@Injectable({
    providedIn: 'root'
  })
export class InterviewerService {
    private _interviewerURL ="http://localhost:8089/admin/interviewer/";

    constructor(private _http: HttpClient) {}

    getInterviewers() :Observable<IInterviewer[]>{
        return this._http.get<IInterviewer[]>(this._interviewerURL+"all?sort=ASC");
    }

}