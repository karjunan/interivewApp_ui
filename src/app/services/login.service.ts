import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


import { ILogin } from "./ILogin";


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

@Injectable({
    providedIn: 'root'
  })
export class LoginService {
    private  _loginURL="";

    constructor(private _http: HttpClient) {}

    getUser(id:String,pass:String): Observable<ILogin> {
        return this._http.get("/server/admin/login?name="+id+"&pass="+pass,httpOptions)
            // .map(data =>  data.json())
            .do(data => console.log('getUsers: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveUser(ilogin: ILogin) : Observable<ILogin>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.createUser(ilogin, options);
    }

    private createUser(ilogin: ILogin, options: RequestOptions): Observable<ILogin> {
        return this._http.post("/server/admin/interviewer", ilogin)
            // .map(v => this.extractData(v))
            .do(data => console.log('createUser: ' + JSON.stringify(data)))
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

}