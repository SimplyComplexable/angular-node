import {Routes} from "@agular/router";
import {MessagesComponent} from "./app/messages/messages.component";
import {AuthenticationComponent} from "./app/auth/authentication.component";

const APP_ROUTES: Routes = [
    { path: '', redirect: '/messages', pathMatch: 'full' },
    { path: 'messages', component: MessagesComponent },
    { path: 'auth', component: AuthenticationComponent }
]