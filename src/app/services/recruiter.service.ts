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

    getRecruiters(): Observable<IRecruiter[]> {
        return this._http.get("/server/admin/recruiter/getAll?sort=ASC",httpOptions)
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
        return this._http.delete("/server/admin/recruiter/"+id,httpOptions)
                    .catch(this.handleError);
    }

    private createRecruiter(recruiter: IRecruiter, options: RequestOptions): Observable<IRecruiter> {
        console.log("Recuriter added : " + recruiter);
        return this._http.post("/server/admin/recruiter", recruiter,options)
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
}