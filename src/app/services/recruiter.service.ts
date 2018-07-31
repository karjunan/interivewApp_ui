import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


import { IRecruiter, Recruiter } from "./IRecruiter";


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

@Injectable({
    providedIn: 'root'
  })
export class RecruiterService {
    private  _recruiterURL="";

    constructor(private _http: HttpClient) {}

    getRecruiter(id:String): Observable<IRecruiter> {
        return this._http.get("/server/admin/"+id,httpOptions)
            .catch(this.handleError);
    }

    getRecruiters(): Observable<IRecruiter[]> {
        return this._http.get("/server/admin/recruiter",httpOptions)
            .catch(this.handleError);
    }

    saveRecruiter(recruiter: IRecruiter) : Observable<IRecruiter>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.createRecruiter(recruiter, options);
    }

    deleteRecruiter(id:String) : Observable<IRecruiter>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete("/server/admin/"+id,httpOptions)
                    .catch(this.handleError);
    }

    private createRecruiter(recruiter: IRecruiter, options: RequestOptions): Observable<IRecruiter> {
        recruiter.employeeType='R';
        // recruiter.interviewerType=localStorage.getItem('role');
        console.log("Recuriter Data :::" + JSON.stringify(recruiter));
        return this._http.post("/server/admin", recruiter, httpOptions)
         .catch(this.handleError);
    }

    updateRecruiter(recruiter: IRecruiter,id: String ): Observable<IRecruiter> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log("Update Recuriter : :: " + JSON.stringify(recruiter));
        return this._http.put("/server/admin/"+id, recruiter, httpOptions)
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

    private handleError(error: Response): Observable<any> {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    searchRecruiter(str:String): Observable<IRecruiter[]> {
        console.log("String value"+ str);
        return this._http.get("/server/admin/recruiter/search?str="+str,httpOptions)
            .catch(this.handleError);
    }
}