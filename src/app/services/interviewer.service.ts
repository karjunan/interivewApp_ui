import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


import { IInterviewer, Interviewer } from "./IInterviewer";


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

@Injectable({
    providedIn: 'root'
  })
export class InterviewerService {
    private  _interviewerURL="";

    constructor(private _http: HttpClient) {}

    getInterviewers(): Observable<IInterviewer[]> {
        return this._http.get("/server/admin/interviewer/all?sort=ASC",httpOptions)
            // .map(this.extractData)
            // .do(data => console.log('getInterviewers: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getInterviewer(id:String): Observable<IInterviewer[]> {
        return this._http.get("/server/admin/interviewer/"+id,httpOptions)
            // .map(this.extractData)
            // .do(data => console.log('getInterviewers: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }


    saveInterviewer(interviewer: IInterviewer) : Observable<IInterviewer>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.createInterviewer(interviewer, options);
    }

    updateInterviewer(interviewer: IInterviewer,id: String ): Observable<IProduct> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put("/server/admin/interviewer/update/"+id, interviewer, options)
            // .map(() => interviewer)
            // .do(data => console.log('updateProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteInterviewer(id:String) : Observable<IInterviewer>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete("/server/admin/interviewer/"+id,httpOptions)
                    .catch(this.handleError);
    }

    private createInterviewer(interviewer: IInterviewer, options: RequestOptions): Observable<IInterviewer> {
        return this._http.post("/server/admin/interviewer/add", interviewer)
            // .map(this.extractData)
            // .do(data => console.log('createInterviewer: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    // saveProduct(product: IProduct): Observable<IProduct> {
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({ headers: headers });

    //     if (product.id === 0) {
    //         return this.createProduct(product, options);
    //     }
    //     return this.updateProduct(product, options);
    // }

}