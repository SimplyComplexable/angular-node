import { RouterModule } from "@angular/router";
import { SignUpComponent } from "./signup.component";
import { SignInComponent } from "./signin.component";
import { LogOutComponent } from "./logout.component";
var AUTH_ROUTES = [
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: 'signup', component: SignUpComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'logout', component: LogOutComponent }
];
export var authRouting = RouterModule.forChild(AUTH_ROUTES);
