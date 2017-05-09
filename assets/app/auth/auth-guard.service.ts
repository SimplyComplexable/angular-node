import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkAuthenticatedRoute(state.url);
    }

    checkAuthenticatedRoute(url: string): boolean {
        if (!this.authService.isLoggedIn()) {
            return true;
        }

        this.router.navigate(['auth','logout']);
        return false;
    }
}