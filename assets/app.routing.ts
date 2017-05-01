import {Routes} from "@agular/router";
import {MessagesComponent} from "./app/messages/messages.component";
import {AuthenticationComponent} from "./app/auth/authentication.component";
import {RouterModule} from "@angular/router";
import {AUTH_ROUTES} from "./app/auth/auth.routes";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/messages', pathMatch: 'full' },
    { path: 'messages', component: MessagesComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);