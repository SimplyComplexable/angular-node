import {RouterModule, Routes} from "@angular/router";
import {SignUpComponent} from "./signup.component";
import {SignInComponent} from "./signin.component";
import {LogOutComponent} from "./logout.component";
import {AuthGuard} from "./auth-guard.service";

const AUTH_ROUTES: Routes = [
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: 'signup', component: SignUpComponent, canActivate: [AuthGuard] },
    { path: 'signin', component: SignInComponent, canActivate: [AuthGuard] },
    { path: 'logout', component: LogOutComponent }
];

export const authRouting = RouterModule.forChild(AUTH_ROUTES);
