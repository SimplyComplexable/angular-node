import {Component, Input} from "@angular/core";

@Component({
    selector: 'app-thread',
    template: `
        <li><a [routerLink]="['/messages']" [queryParams]="{ thread: thread }">{{ '#' + thread }}</a></li>
    `,
    styles: [
        `
            li {
                margin-bottom: 5px;
            }
        `
    ]
})

export class ThreadComponent {
    @Input() thread: string;
}