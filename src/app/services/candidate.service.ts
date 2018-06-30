import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {ICandidate} from './ICandidate';
import {Headers, Response} from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }

  getCandidates(): Observable<ICandidate[]> {
    return this.http.get('/server/admin/candidateService/candidates')
    .do(val => console.log("Finaly val  ::" + JSON.stringify(val)))
    .catch(this.handleError);

  }

  getCandidate(id : String ): Observable<ICandidate> {
        return this.http.get("/server/admin/candidateService/candidate/"+id,httpOptions).catch(this.handleError);

    }

    searchCandidates(str:String): Observable<ICandidate[]> {
        return this.http.get("/server/admin/candidateService/candidate/search?searchAttribute="+str,httpOptions).catch(this.handleError);

    }

    saveCandidate(candidate: ICandidate) : Observable<ICandidate>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        console.log("Candidate from UI ::" + JSON.stringify(candidate));
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

    publishInterview(id: String, experience: String, technologyStack: String) : Observable<ICandidate>{

        return this.http.get("/interviewServer/interview/screen/publish/?candidateId="+id+"&candidateExp="+experience+"&technology="+technologyStack, httpOptions)
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
