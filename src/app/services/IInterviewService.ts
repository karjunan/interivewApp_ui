import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { IInterview } from './IInterview';



const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

@Injectable({
    providedIn: 'root'
})

export class IInterviewService {

    constructor(private _http: HttpClient) {}

    getPendingInterviews(id: String): Observable<IInterview[]> {
        return this._http.get("/interviewServer/interview/screen/pending/"+id,httpOptions)
            // .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError)
       
    }

    
    getAcknowledgedInterviews(id: String): Observable<IInterview[]> {
        return this._http.get("/interviewServer/interview/screen/ack/"+id,httpOptions)
            // .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError)
       
    }

    acknowledgeInterview(interviewObjectId: String, interviewerId:String): Observable<IInterview[]> {
        return this._http.get("/interviewServer/interview/screen/acknowledge?id="+interviewObjectId+"&interviewerId="+interviewerId,httpOptions)
            // .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError)
       
    }

    approveInterview(interviewObjectId: String): Observable<IInterview[]> {
        return this._http.get("/interviewServer/interview/screen/approve?id="+interviewObjectId,httpOptions)
            // .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError)
       
    }

    publishInterview(id: String, experience: String, technologyStack: String) : Observable<IInterview>{

        return this._http.get("/interviewServer/interview/screen/publish/?candidateId="+id+"&candidateExp="+experience+"&technology="+technologyStack, httpOptions)
                .do(data => console.log(" Data from Publish Interview : " + JSON.stringify(data)))    
            .catch(this.handleError);
    }


    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}