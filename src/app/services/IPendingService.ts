import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { IPending } from './IPending';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

@Injectable({
    providedIn: 'root'
})

export class IPendingService {

    constructor(private _http: HttpClient) {}

    getPendingInterviews(id: String): Observable<IPending[]> {
        return this._http.get("/interviewServer/interview/screen/pending/"+id,httpOptions)
            // .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError)
       
    }

    
    getAcknowledgedInterviews(id: String): Observable<IPending[]> {
        return this._http.get("/interviewServer/interview/screen/ack/"+id,httpOptions)
            // .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError)
       
    }

    acknowledgeInterview(interviewObjectId: String, interviewerId:String): Observable<IPending[]> {
        return this._http.get("/interviewServer/interview/screen/acknowledge?id="+interviewObjectId+"&interviewId="+interviewerId,httpOptions)
            // .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError)
       
    }

    approveInterview(interviewObjectId: String): Observable<IPending[]> {
        return this._http.get("/interviewServer/interview/screen/approve?id="+interviewObjectId,httpOptions)
            // .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError)
       
    }


    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}