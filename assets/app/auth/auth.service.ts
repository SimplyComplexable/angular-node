import {User} from "./user.model";
import {Headers, Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {ErrorService} from "../error/error.service";
import {environment} from "../environments";

@Injectable()
export class AuthService {
    rootUrl: string;

    constructor(private http: Http, private errorService: ErrorService) {
        if (environment.prod) {
            this.rootUrl = 'https://nodeangular2-deployment.herokuapp.com/';
        } else {
            this.rootUrl = 'http://localhost:3000/';
        }
    }

    signUp(user: User) {
        const body = JSON.stringify(user);
        const headers =  new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.rootUrl + 'user', body, {headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    signIn(user: User) {
        const body = JSON.stringify(user);
        const headers =  new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.rootUrl + 'user/signin', body, {headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}