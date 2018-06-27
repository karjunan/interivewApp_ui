import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";

import {ICandidate, Candidate} from './ICandidate';
import {Headers, RequestOptions, Response} from '@angular/http';
import {IInterviewer} from './IInterviewer';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }

  getCandidates(): Observable<ICandidate[]> {
    return this.http.get('/server/admin/candidateService/candidates', httpOptions).catch(this.handleError);

  }

  getCandidate(id : String ): Observable<ICandidate> {
        return this.http.get("/server/admin/candidateService/candidate/"+id,httpOptions).catch(this.handleError);

    }

    searchCandidates(str:String): Observable<ICandidate[]> {
        return this.http.get("/server/admin/candidateService/candidate/search?searchAttribute="+str,httpOptions).catch(this.handleError);

    }

    saveCandidate(candidate: ICandidate) : Observable<ICandidate>{
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.createCandidate(candidate);
    }

    updateCandidate(candidate: ICandidate, id: String ): Observable<ICandidate> {
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.put("/server/admin/candidateService/candidate/update/"+id, candidate, httpOptions)
            .catch(this.handleError);
    }

    deleteCandidate(id:String) : Observable<ICandidate>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.delete("/server/admin/candidateService/candidate/delete/"+id,httpOptions)
            .catch(this.handleError);
    }


    private createCandidate(candidate: ICandidate): Observable<ICandidate> {
        return this.http.post("/server/admin/candidateService/candidate/add", candidate)
            .catch(this.handleError);
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}
