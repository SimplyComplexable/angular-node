import {User} from "./user.model";
import {Headers, Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {

    constructor(private http: Http) { }

    signUp(user: User) {
        const body = JSON.stringify(user);
        const headers =  new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('http://locahost:3000/user', body, {headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}