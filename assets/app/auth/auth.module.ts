import {NgModule} from "@angular/core";
import {SignInComponent} from "./signin.component";
import {SignUpComponent} from "./signup.component";
import {LogOutComponent} from "./logout.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {authRouting} from "./auth.routing";

@NgModule({
    declarations: [
        LogOutComponent,
        SignUpComponent,
        SignInComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        authRouting
    ]
})

export class AuthModule {

}