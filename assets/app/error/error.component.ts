import {Component, OnInit} from "@angular/core";
import {Error} from "./error.model";
import {ErrorService} from "./error.service";

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styles: [`
        .backdrop {
            background-color: rgba(0,0,0,0.6);
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
        }
    `]
})
export class ErrorComponent implements OnInit {
    error: Error;
    display: string = 'none';

    constructor(private errorService: ErrorService) {}

    ngOnInit() {
        this.errorService.errorOccurred.subscribe(
            (error: Error) => {
                console.log(error);
                this.error = error;
                this.display = 'block';
            }
        )
    }

    onErrorHandled() {
        this.display = 'none';
    }
}